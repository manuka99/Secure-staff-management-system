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

  it("Registering a new user entity", (done) => {
    request(app)
      .post("/api/admin/general/registration")
      .send(validUser)
      .then((res) => {
        const data = res.body.data;
        expect(res).to.contain.property("statusCode", 200);
        expect(data).to.contain.property("message");
        expect(data).to.not.be.empty;
        expect(data).to.not.contain.property("password");
        done();
      })
      .catch((err) => done(err));
  });

  it("New user can sign in with valid credentials", (done) => {
    request(app)
      .post("/api/guest/general/login")
      .send(validLoginCredentials)
      .then((res) => {
        const data = res.body.data;
        expect(res).to.contain.property("statusCode", 200);
        expect(data).to.contain.property("message");
        expect(data).to.not.be.empty;
        done();
      })
      .catch((err) => done(err));
  });

  it("User cannot sign in with invalid credentials", (done) => {
    request(app)
      .post("/api/guest/general/login")
      .send(inValidLoginCredentials)
      .then((res) => {
        const data = res.body.data;
        expect(res).to.contain.property("statusCode", 400);
        expect(data).to.contain.property("message");
        expect(data).to.not.be.empty;
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
  firstName: "Manuka",
  middleName: "Yasas",
  lastName: "Rankothpelige",
  gender: "male",
  nationalID: "199920610568",
  dateOfBirth: new Date("1999-07-24"),
  phone: 0721146092,
  email: "manukayasas99@gmail.com",
  street: "main",
  province: "western",
  district: "colombo",
  country: "Sri Lanka",
  nationality: "sinhala",
  zipCode: 106300,
  address: "1027/5 colombo",
  raw_password: "test123@123",
  imagePaths: [""],
};

const validLoginCredentials = {
  nationalID: "199920610568",
  raw_password: "test123@123",
};

const inValidLoginCredentials = {
  nationalID: "199920610568",
  raw_password: "test123@123s",
};
