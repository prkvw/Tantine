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

// Import the necessary libraries
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define the test suite
describe("CountdownTimer", function () {
  let countdownTimer;
  let owner;


  // Test the startTimer function
  it("Should start the timer", async function () {
    const duration = 60; // 1 minute
    await countdownTimer.startTimer(duration);
    const endTime = await countdownTimer.endTime();
    expect(endTime).to.equal(Math.floor(Date.now() / 1000) + duration);
  });

  // Test the getTimeLeft function
  it("Should return the time left in the countdown", async function () {
    const duration = 60; // 1 minute
    await countdownTimer.startTimer(duration);
    const timeLeft = await countdownTimer.getTimeLeft();
    expect(timeLeft).to.be.within(duration - 1, duration);
  });

  // Test the getTimeLeft function after the countdown has ended
  it("Should return 0 after the countdown has ended", async function () {
    const duration = 1; // 1 second
    await countdownTimer.startTimer(duration);
    await new Promise(resolve => setTimeout(resolve, duration * 1000)); // Wait for the countdown to end
    const timeLeft = await countdownTimer.getTimeLeft();
    expect(timeLeft).to.equal(0);
  });
});

// User Verification
describe("VerifyUser", function () {
  let owner;
  let user;
  let hashedVerification;


  // Test the addUser function
  it("Should add a user", async function () {
    await dso.addUser(user.address, hashedVerification);
    const isVerified = await dso.isUserVerified(user.address);
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
    const isVerified2 = await dso.isUserVerified(user.address);
    expect(isVerified2).to.equal(true);
  });

});
