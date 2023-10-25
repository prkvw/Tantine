const {
   
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("CreateOrganisation", function () { }
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Donate = await ethers.getContractFactory("DOS");
 // await donate.deployed();

   

  }))

  it("should create an organization", async function () {
    const orgName = "Example Organization";
    const orgAbout = "This is an example organization";


    await dso.createOrganization(orgName, orgAbout, orgGoalAmount);

    const orgCount = await dso.getOrganiationsCount();
    expect(orgCount).to.equal(1);

    const org = await dso.getOrganization(0);
    expect(org.creator).to.equal(owner.address);
    expect(org.name).to.equal(orgName);

    