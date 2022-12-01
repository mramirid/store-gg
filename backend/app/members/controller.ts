import type express from "express";
import fs from "fs/promises";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import path from "path";
import { env } from "../../lib/constant";
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
    member = await Member.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      favoriteCategory: req.body.favoriteCategory,
      avatarName: req.file?.filename,
    });
  } catch (error) {
    next(error);
    return;
  }

  if (_.isObject(req.file)) {
    await fs.copyFile(
      req.file.path,
      path.resolve("public", "uploads", req.file.filename)
    );
  }

  const token = jwt.sign(
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

  res.status(StatusCodes.CREATED).json({ message: "Sign-up success", token });
}
