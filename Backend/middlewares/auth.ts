import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import client from "../config/redis";
dotenv.config();

async function auth(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send({ msg: "please login first" });
  }

  const isBlacklisted = await client.sIsMember("tokenBlacklist", token);
  if (isBlacklisted) {
    return res.status(401).send({ msg: "token is blacklisted" });
  }
  jwt.verify(token, process.env.secret_key, function (err, decoded) {
    if (err) {
      return res.status(404).send({ msg: "please login again" });
    } else {
      console.log(decoded);

      req.body.token = token;
      next();
    }
  });
}

export default auth;
