import { ethers } from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS must be provided");
  }

  const TestoContract = await ethers.getContractFactory("Testo");
  const testo = TestoContract.attach(contractAddress);
  const [deployer] = await ethers.getSigners();

  console.log("Minting from deployer address:", deployer.address);

  try {
    const mintTx = await testo.safeMint(deployer.address);
    const receipt = await mintTx.wait();

    console.log("Transaction details:", mintTx);
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error during minting:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exitCode = 1;
});
