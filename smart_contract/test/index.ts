import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function basicMethod() {
  // random address
  const [deployer, ...users] = await ethers.getSigners();

  // Deploy Token Contract
  const tokens = await ethers.getContractFactory("BasicContract");
  const basicContract = await tokens.deploy();

  return {
    deployer,
    users,
    basicContract,
  };
}
