import express = require("express");
import cookieSession = require("cookie-session");

import "express-async-errors";
import { json } from "body-parser";

import { errorHandler, NotFoundError, currentUser } from "@oggerticket/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
