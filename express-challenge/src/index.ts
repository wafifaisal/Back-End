import express, { Request, Response, Application } from "express";
import { UserRouter } from "./routers/user.router";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db";
import { release } from "os";
import { ExpenseV2Router } from "./routers/userv2.router";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());
const userRouter = new UserRouter();
const expenseV2Router = new ExpenseV2Router();

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, Wellcome to Expense Tracker");
});

app.use("/api/entries", userRouter.getRouter());
app.use("/api/v2/entries", expenseV2Router.getRouter());

pool.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquiring client", err.stack);
  }
  if (client) {
    client.query("Set search_path TO test", (queyErr) => {
      if (queyErr) {
        console.log("Error setting search path", queyErr.stack);
      } else {
        console.log("Success connection test");
      }
    });
  }
  release();
});

console.log(process.env.DATABASE_USER);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api`);
});
