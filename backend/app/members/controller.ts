import type express from "express";
import fs from "fs/promises";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import { env } from "../../lib/constant";
import { CustomValidationError } from "../../lib/error";
import { name as packageName } from "../../package.json";
import Member, { MemberDoc, TMember } from "./model";
import validator from "validator";

export default {
  signUp,
  validateSignInRequest,
  signIn,
  validateEditProfileRequest,
  editProfile,
};

async function signUp(
  req: express.Request<
    unknown,
    unknown,
    Pick<TMember, "fullName" | "email" | "password" | "favoriteCategory">
  >,
  res: express.Response,
  next: express.NextFunction
) {
  let member: MemberDoc | null;

  try {
    member = await Member.findOne({ email: req.body.email });
  } catch (error) {
    next(error);
    return;
  }

  if (_.isObject(member)) {
    const validationError = new CustomValidationError();
    validationError.addValidatorError("email", "Email is already in use");
    validationError.status = StatusCodes.CONFLICT;
    next(validationError);
    return;
  }

  try {
    member = await Member.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      favoriteCategory: req.body.favoriteCategory,
      avatarName: req.file?.filename,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new CustomValidationError(error);
      validationError.status = StatusCodes.UNPROCESSABLE_ENTITY;
      next(validationError);
    } else {
      next(error);
    }
    return;
  }

  if (_.isObject(req.file)) {
    await fs.copyFile(
      req.file.path,
      path.resolve("public", "uploads", req.file.filename)
    );
  }

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Sign-up success", jwtToken: issueJWT(member) });
}

type SignInReqBody = Pick<TMember, "email" | "password">;

async function validateSignInRequest(
  req: express.Request<unknown, unknown, Partial<SignInReqBody>>,
  __: express.Response,
  next: express.NextFunction
) {
  const validationError = new CustomValidationError();

  if (_.isEmpty(req.body.email)) {
    validationError.addValidatorError("email", "Enter your email address");
  } else if (!validator.isEmail(String(req.body.email))) {
    validationError.addValidatorError("email", "Enter a valid email address");
  }

  if (_.isEmpty(req.body.password)) {
    validationError.addValidatorError("password", "Enter your password");
  }

  if (validationError.hasError) {
    validationError.status = StatusCodes.UNPROCESSABLE_ENTITY;
    next(validationError);
    return;
  }

  next();
}

async function signIn(
  req: express.Request<unknown, unknown, SignInReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  let member: MemberDoc | null;

  try {
    member = await Member.findOne({ email: req.body.email });
  } catch (error) {
    next(error);
    return;
  }

  const validationError = new CustomValidationError();

  if (_.isNull(member)) {
    validationError.addValidatorError("email", "Email not found.");
    validationError.status = StatusCodes.NOT_FOUND;
    next(validationError);
    return;
  }

  const doesPasswordMatch = await member.verifyPassword(req.body.password);
  if (!doesPasswordMatch) {
    validationError.addValidatorError("password", "Password does not match!");
    validationError.status = StatusCodes.UNAUTHORIZED;
    next(validationError);
    return;
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Sign-in success", jwtToken: issueJWT(member) });
}

type EditProfileRequest = express.Request<
  unknown,
  unknown,
  Required<Pick<TMember, "fullName" | "email" | "phoneNumber">>,
  Partial<{ removeAvatar: string }>
>;

async function validateEditProfileRequest(
  req: EditProfileRequest,
  __: express.Response,
  next: express.NextFunction
) {
  const member = req.user as Readonly<MemberDoc>;
  const validationError = new CustomValidationError();

  if (req.body.email !== member.email) {
    const emailExists = await Member.exists({ email: req.body.email });
    if (_.isObject(emailExists)) {
      validationError.addValidatorError("email", "Email is already in use");
      validationError.status = StatusCodes.CONFLICT;
      next(validationError);
      return;
    }
  }

  if (_.isString(req.query.removeAvatar) && _.isObject(req.file)) {
    validationError.addValidatorError(
      "avatar",
      "Do not upload a new avatar if you are removing the old one"
    );
    validationError.status = StatusCodes.BAD_REQUEST;
    next(validationError);
    return;
  }
  if (_.isString(req.query.removeAvatar) && _.isUndefined(member.avatarName)) {
    validationError.addValidatorError(
      "avatar",
      "Cannot remove the avatar because it has not been set yet"
    );
    validationError.status = StatusCodes.NOT_FOUND;
    next(validationError);
    return;
  }

  next();
}

async function editProfile(
  req: EditProfileRequest,
  res: express.Response,
  next: express.NextFunction
) {
  const member = req.user as MemberDoc;

  member.fullName = req.body.fullName;
  member.email = req.body.email;
  member.phoneNumber = req.body.phoneNumber || (undefined as unknown as string);

  const prevAvatarName = member.avatarName;
  const shouldAddAvatar =
    _.isObject(req.file) &&
    _.isUndefined(prevAvatarName) &&
    _.isUndefined(req.query.removeAvatar);
  const shouldChangeAvatar =
    _.isObject(req.file) &&
    _.isString(prevAvatarName) &&
    _.isUndefined(req.query.removeAvatar);
  const shouldRemoveAvatar =
    _.isUndefined(req.file) &&
    _.isString(prevAvatarName) &&
    _.isString(req.query.removeAvatar);

  if (shouldAddAvatar || shouldChangeAvatar) {
    member.avatarName = (req.file as Express.Multer.File).filename;
  } else if (shouldRemoveAvatar) {
    member.avatarName = undefined as unknown as string;
  }

  try {
    await member.save({ validateModifiedOnly: true });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new CustomValidationError(error);
      validationError.status = StatusCodes.UNPROCESSABLE_ENTITY;
      next(validationError);
    } else {
      next(error);
    }
    return;
  }

  if (shouldAddAvatar || shouldChangeAvatar) {
    const uploadedAvatar = req.file as Express.Multer.File;
    await fs.copyFile(
      uploadedAvatar.path,
      path.resolve("public", "uploads", uploadedAvatar.filename)
    );
  }
  if (shouldChangeAvatar || shouldRemoveAvatar) {
    await fs.unlink(
      path.resolve("public", "uploads", prevAvatarName as string)
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Profile edited", jwtToken: issueJWT(member) });
}

function issueJWT(member: MemberDoc) {
  return jwt.sign(
    {
      fullName: member.fullName,
      email: member.email,
      avatarName: member.avatarName,
      phoneNumber: member.phoneNumber,
    },
    env.BACKEND_SECRET,
    {
      issuer: packageName,
      subject: member.id,
      expiresIn: "1d",
    }
  );
}
