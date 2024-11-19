import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get("/", this.userController.getUsers);
    this.router.post("/", this.userController.addExpense);
    this.router.get("/nominal", this.userController.getTotalNominalByDateRange);
    this.router.get("/category", this.userController.getTotalNominalByCategory);

    this.router.get(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.getExpenseId
    );

    this.router.patch(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.updateEntries
    );

    this.router.delete(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.deleteEntries
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
