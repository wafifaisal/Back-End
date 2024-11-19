import { Request, Response } from "express";
import fs from "fs";
import { IEntries } from "../types/user";

export class UserController {
  getUsers(req: Request, res: Response) {
    const { type, category, start, end } = req.query;
    let entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    entries = entries.filter((item) => {
      let isValid: boolean = true;
      if (category) {
        isValid = isValid && item.category == category;
      }
      if (start && end) {
        const startDate = new Date(start as string);
        const endDate = new Date(end as string);
        const entriesDate = new Date(item.date);
        isValid = isValid && entriesDate >= startDate && entriesDate <= endDate;
      }
      return isValid;
    });
    if (type) {
      entries = entries.filter((item) =>
        item.type.toLowerCase().includes(type as string)
      );
    }
    res.status(200).send({ entries });
  }
  getExpenseId(req: Request, res: Response) {
    const { id } = req.params;
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const data = entries.find((item) => item.id == +id);
    if (data) {
      res.status(200).send({ entries: data });
    } else {
      res.status(400).send({ entries: data });
    }
  }

  addExpense(req: Request, res: Response) {
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const id = Math.max(...entries.map((item) => item.id)) + 1 || 1;
    const newDate = new Date();
    const date = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
    const { title, nominal, type, category } = req.body;
    const newData: IEntries = { id, title, nominal, type, category, date };
    entries.push(newData);

    fs.writeFileSync("./db/entries.json", JSON.stringify(entries));
    res.status(200).send({ entries: newData });
  }
  updateEntries(req: Request, res: Response) {
    const { id } = req.params;
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const idx: number = entries.findIndex((item) => item.id == +id);
    entries[idx] = { ...entries[idx], ...req.body };
    fs.writeFileSync("./db/entries.json", JSON.stringify(entries));
    res.status(200).send("User updated!");
  }
  deleteEntries(req: Request, res: Response) {
    const { id } = req.params;
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const newEntries = entries.filter((item) => item.id != +id);
    fs.writeFileSync("./db/entries.json", JSON.stringify(newEntries));
    res.status(200).send("User deleted!");
  }

  getTotalNominalByDateRange(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const total = entries
      .filter(
        (entries) =>
          entries.type === "expense" &&
          new Date(entries.date) >= start &&
          new Date(entries.date) <= end
      )
      .reduce((sum, entries) => sum + entries.nominal, 0);
    res.status(200).send({ Form: startDate, To: endDate, Total: total });
  }

  getTotalNominalByCategory(req: Request, res: Response) {
    const { category } = req.query;
    const entries: IEntries[] = JSON.parse(
      fs.readFileSync("./db/entries.json", "utf-8")
    );
    const total = entries
      .filter((entries) =>
        entries.category
          .toLowerCase()
          .includes((category as string).toLowerCase())
      )
      .reduce((sum, entries) => sum + entries.nominal, 0);
    res.status(200).send({ Total: total });
  }
}
