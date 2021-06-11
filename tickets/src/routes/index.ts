import express = require("express");
import { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  // return ticket doesn't have orderId(hasn't been reserved)
  const tickets = await Ticket.find({ orderId: undefined });

  res.send(tickets);
});

export { router as indexTicketRouter };
