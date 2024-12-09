import { Router } from "express";
import { PostController } from "../controllers/post.controller";

export class PostRouter {
  private postcontroller: PostController;
  private router: Router;

  constructor() {
    this.postcontroller = new PostController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get("/", this.postcontroller.getPosts);
  }

  getRouter(): Router {
    return this.router;
  }
}
