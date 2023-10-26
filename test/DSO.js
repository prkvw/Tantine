const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DSO Contract", function () {
  let owner;
  let user;
  let dso;

  before(async function () {
    [owner, user] = await ethers.getSigners();
    const DSOFactory = await ethers.getContractFactory("DSO");
    dso = await DSOFactory.deploy();
    // await dso.deployed();
  });

  it("should create an organization", async function () {
    await dso.createOrganization("Example Organization", "This is an example organization");

    const orgCount = await dso.getOrganizationsCount();
    expect(Number(orgCount)).to.equal(1);

    const org = await dso.getOrganization(0);
    expect(org.creator).to.equal(await owner.getAddress());
    expect(org.name).to.equal("Example Organization");
    expect(org.about).to.equal("This is an example organization");
  });

  it("should add and verify a user", async function () {
    const verificationCode = "verification code";
    const hashedVerification = ethers.keccak256(ethers.toUtf8Bytes(verificationCode));

    await dso.addUser(await user.getAddress(), hashedVerification);
    const isVerifiedBefore = await dso.isUserVerified(await user.getAddress());
    expect(isVerifiedBefore).to.equal(false);

    await dso.verifyUser(hashedVerification);
    const isVerifiedAfter = await dso.isUserVerified(await user.getAddress());
    expect(isVerifiedAfter).to.equal(true);
  });

  it("should allow user login and logout", async function () {
    const verificationCode = "verification code";
    const hashedVerification = ethers.keccak256(ethers.toUtf8Bytes(verificationCode));

    await dso.addUser(await user.getAddress(), hashedVerification);
    await dso.verifyUser(hashedVerification);

    const isLoggedInBefore = await dso.isUserLoggedIn(await user.getAddress());
    expect(isLoggedInBefore).to.equal(false);

    await dso.login();
    const isLoggedInAfterLogin = await dso.isUserLoggedIn(await user.getAddress());
    expect(isLoggedInAfterLogin).to.equal(true);

    await dso.logout();
    const isLoggedInAfterLogout = await dso.isUserLoggedIn(await user.getAddress());
    expect(isLoggedInAfterLogout).to.equal(false);
  });

  it("should not allow unverified user to login", async function () {
    const isLoggedInBefore = await dso.isUserLoggedIn(await user.getAddress());
    expect(isLoggedInBefore).to.equal(false);

    // Try to log in without verifying
    try {
      await dso.login();
    } catch (error) {
      expect(error.message).to.contain("User is not verified");
    }

    const isLoggedInAfterFailedLogin = await dso.isUserLoggedIn(await user.getAddress());
    expect(isLoggedInAfterFailedLogin).to.equal(false);
  });
});
