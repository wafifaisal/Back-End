import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { IUser } from "../types/user";

export class UserMiddleware {
  checkId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );

    const data = users.find((item) => item.id == parseInt(id));
    if (data) {
      next();
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  }
}
