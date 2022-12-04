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
import Member, { IMember, MemberDoc } from "./model";

async function signUp(
  req: express.Request<
    unknown,
    unknown,
    Pick<IMember, "fullName" | "email" | "password" | "favoriteCategory">
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
      expiresIn: "60d",
    }
  );
}

export default { signUp };
