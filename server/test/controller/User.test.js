import express from "express";
import userController from "../../src/controller/user.controller";
import request from "supertest"
import * as userService from "../../src/service/user.service";


const app = express();

app.use("/api/users", userController);


describe("Test User Controller", () => {
  test("It should return a list of users", async () => {
    jest.spyOn(
      userService,'getUsers'
    ).mockResolvedValue(['dummy user'])
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(['dummy user'])
  });
});