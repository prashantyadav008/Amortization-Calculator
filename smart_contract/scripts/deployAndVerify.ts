import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  //Deploy EMI_Contract Contract
  const Token = await ethers.getContractFactory("EMI_Contract");
  const token = await Token.deploy();

  await token.deployTransaction.wait(5);

  await hre.run("verify:verify", {
    address: token.address,
    contract: "contracts/EMI_Contract.sol:EMI_Contract",
  });

  console.log("Basic Contract Address-> ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Deploy error-> ", error);
    process.exit(1);
  });
