import express, { Request, Response, Application } from "express";
import { UserRouter } from "./routers/user.router";
import cors from "cors";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());
const userRouter = new UserRouter();

//GET /api

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, wellcome to my API");
});

app.use("/api/user", userRouter.getRouter());

// app.get("/api/users", (req: Request, res: Response) => {
//   res.status(200).send({
//     users: ["Andi", "Budi", "Caca"],
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
