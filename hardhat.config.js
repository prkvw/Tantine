require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    
      mumbai: {
        url: 'https://polygon-mumbai.g.alchemy.com/v2/5GeROqnqYCFTFNq7B8leEBeqKXYkNCWh',
        accounts: [ process.env.PRIVATE_KEY ]
      },
    sepolia: { url: `https://sepolia.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    
    },
    
    },
  };
