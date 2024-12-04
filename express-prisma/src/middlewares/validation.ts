import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("username").notEmpty().withMessage("username is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3 })
    .withMessage("Password must be 3 characters at minimum"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
