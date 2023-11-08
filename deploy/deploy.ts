import { GasCostPlugin } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployTesto = async (hre: HardhatRuntimeEnvironment) => {
  const { ethers, deployments } = hre;
  const { log, deploy } = deployments;

  const signers = await ethers.getSigners();
  const deployer = signers[0]
  const deployerAddress = deployer.address


  await deploy("Testo", {
    from: deployerAddress,
    args: [deployerAddress, deployerAddress, deployerAddress],
    log: true, 
  });
  
  

};

export default deployTesto;
