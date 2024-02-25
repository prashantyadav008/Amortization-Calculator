import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { basicMethod } from "./index";

describe("Basic Contract", () => {
  it("Should check Message ", async () => {
    const { deployer, basicContract } = await loadFixture(basicMethod);
    expect(await basicContract.getMessage()).to.be.equal("Hello Coders!");
  });

  it("Should check Update Message ", async () => {
    const { deployer, basicContract } = await loadFixture(basicMethod);

    await basicContract.updateMessage("Update New Message!");

    expect(await basicContract.getMessage()).to.be.equal("Update New Message!");
  });

  it("Should check Event Value ", async () => {
    const { deployer, basicContract, users } = await loadFixture(basicMethod);

    await basicContract.updateMessage("Update New Message!");

    expect(await basicContract.getMessage())
      .to.emit(basicContract, "Messages")
      .withArgs("Hello Coders!", "Update New Message!", users[0].address);
  });
});
