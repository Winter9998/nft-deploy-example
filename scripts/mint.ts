import { ethers } from "hardhat";


export async function main() {

  const TST = await ethers.getContractFactory("Testo")
  
  const contractAddress = process.env.CONTRACT_ADDRESS as string
  
  const testo =  TST.attach(contractAddress)

  const signers = await ethers.getSigners()

  const deployer = signers[0] 

  const mintTx = await testo.getFunction("safeMint")(deployer.address)
  
  const receipt = await mintTx.wait()

  console.log(mintTx, receipt)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
