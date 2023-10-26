const hre = require('hardhat');

async function main() {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'http://127.0.0.1:8545/'
  );

  const contract = new ethers.Contract(
    'INSERT_CONTRACT_ADDRESS',
    'INSERT_CONTRACT_ABI',
    provider
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});