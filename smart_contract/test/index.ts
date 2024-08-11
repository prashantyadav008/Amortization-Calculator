import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function basicMethod() {
  // random address
  const [deployer, ...users] = await ethers.getSigners();

  // Deploy Token Contract
  const EMI_Contract = await ethers.getContractFactory("EMI_Contract");
  const emiContract = await EMI_Contract.deploy();

  return {
    deployer,
    users,
    emiContract,
  };
}
