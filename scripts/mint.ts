// Scripts to mint in the contract 
import { ethers } from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS as string; // get contract address in .env
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS must be provided");
  }

// get the contract name and attach it to the sepolia address
  const TestoContract = await ethers.getContractFactory("Testo"); 
  const testo = TestoContract.attach(contractAddress);
  const [deployer] = await ethers.getSigners();

  console.log("Minting from deployer address:", deployer.address);

  try { // check w/ try and catch
    const mintTx = await testo.safeMint(deployer.address); // calls the function here
    const receipt = await mintTx.wait();

    console.log("Transaction details:", mintTx);
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error during minting:", error);
    process.exit(1);
  }
}

// run main()
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exitCode = 1;
});
