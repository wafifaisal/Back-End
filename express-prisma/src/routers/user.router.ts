import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { checkAdmin, verifyToken } from "../middlewares/verify";
import { uploader } from "../services/uploader";

export class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", verifyToken, checkAdmin, this.userController.getUsers);
    this.router.get("/profile", verifyToken, this.userController.getUserId);
    this.router.post("/", this.userController.createUser);
    this.router.patch(
      "/avatar",
      uploader("diskStorage", "avatar-", "/avatar").single("file"),
      this.userController.editAvatar
    );
    this.router.patch(
      "/avatar-cloud",
      verifyToken,
      uploader("memoryStorage", "avatar").single("file"),
      this.userController.editAvatarCloud
    );

    this.router.delete("/:id", this.userController.deleteUser);
    this.router.patch("/:id", this.userController.editUser);
  }
  getRouter(): Router {
    return this.router;
  }
}
