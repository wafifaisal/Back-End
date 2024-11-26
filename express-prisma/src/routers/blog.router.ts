import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.blogController.getBlog);
  }

  getRouter(): Router {
    return this.router;
  }
}
