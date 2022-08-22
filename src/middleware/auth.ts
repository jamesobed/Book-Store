import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
import { AuthorInstance } from "../model/user";

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;
    const cookie = req.cookies.token;
    if (!authorization && !cookie) {
      res.redirect("/author/login");
    }
    const token =
      (authorization?.slice(7, authorization.length) as string) || cookie;

    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "User not verified, you cant access this route",
      });
    }
    const { id } = verified as { [key: string]: string };

    const user = await AuthorInstance.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        Error: "User not verified",
      });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      Error: "User not logged in",
    });
  }
}
