const hre = require("hardhat");

async function main() {
 

  console.log("Deploying contracts with the account")

  const dso = await hre.ethers.deployContract("DSO", {
   
  });

  await dso.waitForDeployment();

  console.log(
    `DSO deployed to ${dso.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});