import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose = require("mongoose");
import request = require("supertest");
import { app } from "../app";
import jwt = require("jsonwebtoken");

//declare global singin function
declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock("../nats-wrapper");
process.env.STRIPE_KEY =
  "sk_test_51HYEMZGH8KVOrYWmvChiHW6RedJ7y1Aqcvl1yso0FED4A1QMr901t7Rrm7IMRa4RAEg9y51frW11fjvPXIQVXYOs00oZUyFGOF";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// id is optional params
global.signin = (id?: string) => {
  // Build a JWT payload
  const payload = {
    // if id is defined assigned, if not use random generated id
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // BUild session object. {jwt: MY_JWT}
  const session = { jwt: token };
  // TUrn session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a stirng have the cookies with the encode data
  return [`express:sess=${base64}`];
};
