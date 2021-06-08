import express = require("express");
import jwt = require("jsonwebtoken");

import { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@oggerticket/common";

import { User } from "../models/user";
import { PasswordManager } from "../services/passwordManager";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    try {
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }

    const passwordMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credenetials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
