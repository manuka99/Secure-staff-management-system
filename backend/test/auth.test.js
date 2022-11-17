const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { connect, close, clearDatabase } = require("../Startups/Database");

describe("POST User Identification", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Remove and close the db and server.
   */
  after((done) => {
    close()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Clear all test data after every test.
   */
  beforeEach((done) => {
    done();
    // clearDatabase()
    //   .then(() => done())
    //   .catch((err) => done(err));
  });

  it("Add a new manager", (done) => {
    request(app)
      .post("/api/user/register")
      .send(validUser)
      .then((res) => {
        const data = res.body;
        expect(res).to.contain.property("statusCode", 200);
        expect(data).to.not.be.empty;
        expect(data).to.contain.property("msg");
        expect(data).to.not.contain.property("password");
        done();
      })
      .catch((err) => done(err));
  });

  it("A manager can sign in with valid credentials", (done) => {
    request(app)
      .post("/api/user/login")
      .send(validLoginCredentials)
      .then((res) => {
        const data = res.body;
        expect(res).to.contain.property("statusCode", 200);
        expect(data).to.not.be.empty;
        expect(data).to.contain.property("token");
        done();
      })
      .catch((err) => done(err));
  });

  it("A user cannot sign in with invalid credentials", (done) => {
    request(app)
      .post("/api/user/login")
      .send(inValidLoginCredentials)
      .then((res) => {
        const data = res.body;
        expect(res).to.contain.property("statusCode", 400);
        expect(data).to.not.be.empty;
        expect(data).to.contain.property("msg");
        done();
      })
      .catch((err) => done(err));
  });

  // it("Innovator requires submission and payment", (done) => {
  //   request(app)
  //     .post("/api/public/register")
  //     .send(inValidInnovator)
  //     .then((res) => {
  //       const { params } = res.body.data;
  //       expect(params).to.have.property("payment");
  //       expect(params).to.have.property("file");
  //       expect(params).to.have.property("email");
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // it("Researcher requires submission", (done) => {
  //   request(app)
  //     .post("/api/public/register")
  //     .send(inValidResearcher)
  //     .then((res) => {
  //       const { params } = res.body.data;
  //       expect(params).to.have.property("file");
  //       expect(params).to.have.property("email");
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // it("Presenter requires submission", (done) => {
  //   request(app)
  //     .post("/api/public/register")
  //     .send(inValidPresenter)
  //     .then((res) => {
  //       const { params } = res.body.data;
  //       expect(params).to.have.property("file");
  //       expect(params).to.have.property("email");
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });
});

const validUser = {
  email: "manukayasas99@gmail.com",
  password: "12345678",
  re_password: "12345678",
  name: "manuka",
  user_type: "manager",
};

const validLoginCredentials = {
  email: "manukayasas99@gmail.com",
  password: "12345678",
};

const inValidLoginCredentials = {
  email: "manukayasas99@gmail.com",
  password: "123456789",
};
