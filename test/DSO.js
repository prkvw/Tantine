const { expect } = require("chai");
const { ethers } = require("hardhat");
const { } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

  describe("CreateOrganisation", function () { 
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Donate = await ethers.getContractFactory("DSO");
 // await donate.deployed();

   

  })

  it("should create an organization", async function () {
    const orgName = "Example Organization";
    const orgAbout = "This is an example organization";


    await dso.createOrganization(orgName, orgAbout, orgGoalAmount);

    const orgCount = await dso.getOrganiationsCount();
    expect(orgCount).to.equal(1);

    const org = await dso.getOrganization(0);
    expect(org.creator).to.equal(owner.address);
    expect(org.name).to.equal(orgName);

  })});



// Define the test suite
describe("UserVerification", function () {
  let userVerification;
  let owner;
  let user;
  let hashedVerification;

  // Deploy the contract and set up the test environment
  beforeEach(async function () {
    const UserVerification = await ethers.getContractFactory("UserVerification");
    userVerification = await dso.deploy();
    await userVerification.deployed();

    [owner, user] = await ethers.getSigners();
    hashedVerification = ethers.utils.sha256("verification code");
  });

  // Test the addUser function
  it("Should add a user", async function () {
    await dso.addUser(user.address, hashedVerification);
    const isVerified = await userVerification.isUserVerified(user.address);
    expect(isVerified).to.equal(false);dso
  });

  // Test the verifyUser function
  it("Should verify a user", async function () {
    await dso.addUser(user.address, hashedVerification);
    await dso.verifyUser("verification code");
    const isVerified = await dso.isUserVerified(user.address);
    expect(isVerified).to.equal(true);
  });

  // Test the isUserVerified function
  it("Should return whether a user is verified", async function () {
    await dso.addUser(user.address, hashedVerification);
    const isVerified = await dso.isUserVerified(user.address);
    expect(isVerified).to.equal(false);

    await dso.verifyUser("verification code");
    const isVerified2 = await userVerification.isUserVerified(user.address);
    expect(isVerified2).to.equal(true);
  });
});
