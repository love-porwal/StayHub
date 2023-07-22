import { Request, Response, NextFunction } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import * as dotenv from "dotenv";
import client from "../config/redis";
dotenv.config();
interface DecodedToken {
  userID: number; 
  email:string;
}
async function auth(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send({ msg: "please login first" });
  }

  const isBlacklisted = await client.sIsMember("tokenBlacklist", token);
  if (isBlacklisted) {
    return res.status(401).send({ msg: "token is blacklisted" });
  }
  jwt.verify(token, process.env.secret_key, function (err, decoded:DecodedToken | string) {
    if (err) {
      return res.status(404).send({ msg: "please login again" });
    } else {
      if (typeof decoded === "string") {
         
        return res.status(500).send({ msg: "Unexpected token format" });
      }
      console.log(decoded);

      req.body.token = token;
      req.body.userID=decoded.userID  
      next();
    }
  });
}

export default auth;