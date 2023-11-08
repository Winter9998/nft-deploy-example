import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import * as dotenv from 'dotenv';
dotenv.config();


const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings : {
  
    }
  },

  defaultNetwork: "hardhat",
  networks: {
    sepolia : {
      url: process.env.SEPOLIA_INFURA_URL as string,
      chainId: 11155111,
      gas: "auto",
      accounts: [process.env.PRIVATE_KEY as string],
      
    }

  },
};

export default config;