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
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.get("/", this.userController.getUsers);
    this.router.post("/", this.userController.addUser);

    this.router.get(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.getUserId
    );
    this.router.patch(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.updateUser
    );
    this.router.delete(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.deleteUser
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
