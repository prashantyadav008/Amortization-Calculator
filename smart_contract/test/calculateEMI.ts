import { exit } from "process";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { basicMethod } from "./index";

// convert value into Big Number with decimal places like 1^18 or 1e18
export function decimal(value: any) {
  const powValue = BigNumber.from("10").pow(18);
  return BigNumber.from(value).mul(powValue);
}

// convert value into Big Number
export function big(value: any) {
  return BigNumber.from(value);
}

describe("Basic Contract", () => {
  it("Should check Message ", async () => {
    const { basicContract } = await loadFixture(basicMethod);

    let loanRequired = 1000000;
    let interest = 1050;
    let months = 120;
    let r = interest / 120000;
    let numerator = r * (1 + r) ** months;
    let denominator = (1 + r) ** months - 1;

    numerator = Math.round(numerator * 10 ** 8);
    denominator = Math.round(denominator * 10 ** 8);

    // console.log("loanRequired >", loanRequired);
    // console.log("interest --->>", interest);
    // console.log("months ------>", months);
    // console.log("r --->>", r);
    // console.log("numerator ---------->>", numerator);
    // console.log("denominator ---------->>", denominator);

    // let emi = await basicContract.calculate(
    //   loanRequired,
    //   interest,
    //   months,
    //   numerator,
    //   denominator,
    // );

    // let principal = emi[0];
    // let interestAmount = emi[1];
    // let monthly = emi[2];
    // let remaining = emi[3];

    // for (let i = 0; i < months; i++) {
    //   console.log(
    //     i + 1,
    //     " ->> principal ",
    //     principal[i],
    //     " interest",
    //     interestAmount[i],
    //     " ",
    //     remaining[i],
    //   );
    // }

    exit();
  });

  it.only("Should check Message ", async () => {
    const { basicContract } = await loadFixture(basicMethod);

    let loanRequired = 100000;
    let interest = 1000;
    let months = 12;
    let r = interest / 120000;
    let numerator = r * (1 + r) ** months;
    let denominator = (1 + r) ** months - 1;

    // numerator = numerator * 10 ** 18;
    // denominator = denominator * 10 ** 18;

    console.log("loanRequired >", loanRequired);
    console.log("interest --->>", interest);
    console.log("months ------>", months);
    console.log("r --->>", r);
    console.log("power --->>", (1 + r) ** months);
    console.log("numerator ---------->>", numerator);
    console.log("denominator ---------->>", denominator);
    console.log("total numerator ---------->>", loanRequired * numerator);
    console.log(
      "total denominator---------->>",
      (loanRequired * numerator) / denominator,
    );
    console.log(
      "Total Payment ---------->>",
      ((loanRequired * numerator) / denominator) * months,
    );

    console.log(
      "------------------------------------------------------------------------------------------",
    );

    let emi = await basicContract.calculateEMI(
      ethers.utils.parseUnits(loanRequired.toString(), 0),
      ethers.utils.parseUnits(interest.toString(), 0),
      ethers.utils.parseUnits(months.toString(), 0),
    );

    for (let i = 0; i < months; i++) {
      console.log(
        emi[1][i].add(emi[2][i]),
        emi[0].mul(months),
        emi[1][i],
        emi[2][i],
        emi[3][i],
      );
    }

    exit();
  });
});
