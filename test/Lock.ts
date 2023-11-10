import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract, Signer } from 'ethers';

describe('Ethereum ERC-721 Test', () => {
  let testNFT: Contract;
  let deployer: Signer;
  let user: Signer;
  let deployerAddress: string;
  let userAddress: string;

  beforeEach(async () => {
    const NFTTest = await ethers.getContractFactory('Testo');
    testNFT = await NFTTest.deploy(deployer, deployer, deployer);
    await testNFT.deployed();
    [deployer, user] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    userAddress = await user.getAddress();
  });

  it('Should check if MINTER_ROLE is granted to deployer', async () => {
    const MINTER_ROLE = await testNFT.getFunction("MINTER_ROLE")();
    expect(await testNFT.hasRole(MINTER_ROLE, deployerAddress)).to.be.true;
  });

  it('Should check if PAUSER_ROLE is granted to deployer', async () => {
    const PAUSER_ROLE = await testNFT.getFunction("PAUSER_ROLE")();
    expect(await testNFT.hasRole(PAUSER_ROLE, deployerAddress)).to.be.true;
  });

  it('Should check if minting is paused', async () => {
    expect(await testNFT.getFunction("paused")()).to.be.false;
  });

  it('Should mint 2 NFTs to the deployer', async () => {
    const mintTx1 = await testNFT.connect(deployer).getFunction("mint")(deployerAddress, 1);
    await mintTx1.wait();

    const mintTx2 = await testNFT.connect(deployer).getFunction("mint")(deployerAddress, 2);
    await mintTx2.wait();

    expect(await testNFT.getFunction("balanceOf")(deployerAddress)).to.equal(2);
  });

  it('Should check if deployer has 2 NFTs', async () => {
    expect(await testNFT.getFunction("balanceOf")(deployerAddress)).to.equal(2);
  });

  it('Should transfer one NFT from deployer to user', async () => {
    await testNFT.connect(deployer).getFunction("transferFrom")(deployerAddress, userAddress, 1);
    expect(await testNFT.getFunction("balanceOf")(deployerAddress)).to.equal(1);
    expect(await testNFT.getFunction("balanceOf")(userAddress)).to.equal(1);
  });
});
