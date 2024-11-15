import { Request, Response } from "express";
import fs from "fs";
import { IUser } from "../types/user";

export class UserController {
  users: any;
  getUsers(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    res.status(200).send({ users });
  }
  getUserId(req: Request, res: Response) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );

    const data = users.find((item) => item.id == parseInt(id));
    if (data) {
      res.status(200).send({ user: data });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
  addUser(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    const id = Math.max(...users.map((item) => item.id)) + 1;
    const { name, email, password } = req.body;
    const newData: IUser = { id, name, email, password };
    users.push(newData);
    fs.writeFileSync("./db/user.json", JSON.stringify(users), "utf-8");
    res.status(200).send({ user: newData });
  }
}
