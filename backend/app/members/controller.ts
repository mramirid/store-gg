import type express from "express";
import fs from "fs/promises";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import { env } from "../../lib/constant";
import { FormValidationError } from "../../lib/error";
import { name as packageName } from "../../package.json";
import Member, { IMember, MemberDoc } from "./model";

export default { signUp };

async function signUp(
  req: express.Request<
    unknown,
    unknown,
    Pick<IMember, "fullName" | "email" | "password" | "favoriteCategory">
  >,
  res: express.Response,
  next: express.NextFunction
) {
  let member: MemberDoc;

  try {
    const emailExists = await Member.exists({ email: req.body.email });
    if (_.isObject(emailExists)) {
      const validationError = new FormValidationError();
      validationError.addFieldError("email", "Email is already in use");
      const http409Error = new createHttpError.Conflict();
      http409Error.cause = validationError;
      throw http409Error;
    }
  } catch (error) {
    next(error);
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
      const http422Error = new createHttpError.UnprocessableEntity();
      http422Error.cause = error;
      next(http422Error);
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
    .json({ message: "Sign-up success", token: issueJWT(member) });
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
