import { ethers } from "hardhat";

async function main() {
  const EMI_Contract = await ethers.getContractFactory("CalculateEMI");
  const emiContract = await EMI_Contract.deploy();
  console.log("EMI Contract Address-> ", emiContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Deploy error-> ", error);
    process.exit(1);
  });


// 0xfB4C43077BF2e794D9da6ab5aa8273C06d78ef4A