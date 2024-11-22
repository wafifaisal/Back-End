import { Request, Response } from "express";
import pool from "../config/db";
import { IEntries } from "../types/user";

export class ExpenseV2Controller {
  async getExpense(req: Request, res: Response) {
    const { category } = req.query;
    let query = "select * from expense";
    if (category) {
      query += ` where category = '${category}'`;
    }

    query += " order by id asc";
    const result = await pool.query(query);
    const expenses: IEntries[] = result.rows;

    res.status(200).send({ expenses });
  }

  async getExpensebyID(req: Request, res: Response) {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM expense WHERE id = ${id}`);
    const expenses: IEntries[] = result.rows;

    res.status(200).send({ expenses });
  }

  async addExpense(req: Request, res: Response) {
    const { title, nominal, type, category, date } = req.query;
    await pool.query(
      `INSERT INTO expense (title, nominal, type, category,date) values('${title}','${nominal}','${type}','${category}','${date}')`
    );
    res.status(200).send({ Message: "Expense Added!" });
  }

  async editExpense(req: Request, res: Response) {
    console.log(req.body);
    const { id } = req.params;
    const query = [];
    for (let key in req.body) {
      query.push(`${key} = '${req.body[key]}'`);
      console.log(query.join(", "));
    }
    await pool.query(`update expense set ${query.join(", ")} where id = ${id}`);
    res.status(200).send("Expense Edited");
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(`DELETE FROM expense WHERE id = ${id}`);
    res.status(200).send({ Message: `Expense id:${id} deleted!` });
  }
}
