/** @format */

import { exit } from "process";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { basicMethod } from "./index";

describe("Calculate EMI Contract", () => {
  it("Should check Message ", async () => {
    const { emiContract } = await loadFixture(basicMethod);

    let loanRequired = 100000;
    let interest = 1000;
    let months = 12;
    let interestOnlyPeriod = 0;
    let r = interest / 120000;
    let numerator = r * (1 + r) ** months;
    let denominator = (1 + r) ** months - 1;

    // console.log("loanRequired >", loanRequired);
    // console.log("interest --->>", interest);
    // console.log("months ------>", months);
    // console.log("r --->>", r);
    // console.log("power --->>", (1 + r) ** months);
    // console.log("numerator ---------->>", numerator);
    // console.log("denominator ---------->>", denominator);
    // console.log("total numerator ---------->>", loanRequired * numerator);
    // console.log(
    //   "total denominator---------->>",
    //   (loanRequired * numerator) / denominator,
    // );
    // console.log(
    //   "Total Payment ---------->>",
    //   ((loanRequired * numerator) / denominator) * months,
    // );

    // console.log(
    //   "------------------------------------------------------------------------------------------",
    // );

    // console.log(
    //   "calculateEMI---->>> ",
    //   await calculateEMI.calculateEMI(
    //     ethers.utils.parseUnits(loanRequired.toString(), 0),
    //     ethers.utils.parseUnits(interest.toString(), 0),
    //     ethers.utils.parseUnits(months.toString(), 0),
    //     ethers.utils.parseUnits(interestOnlyPeriod.toString(), 0),
    //   ),
    // );

    let emi = await emiContract.amortizationTable(
      ethers.utils.parseUnits(loanRequired.toString(), 18),
      ethers.utils.parseUnits(interest.toString(), 0),
      ethers.utils.parseUnits(months.toString(), 0),
      ethers.utils.parseUnits(interestOnlyPeriod.toString(), 0),
    );

    console.log(
      "monthPrincipal       monthInterest             emi             remaining         loanPaidTillDate",
    );

    for (let i = 0; i < months; i++) {
      console.log(
        Number(emi.monthPrincipal[i]) / 1e18,
        "\t   ",
        Number(emi.monthInterest[i]) / 1e18,
        "\t   ",
        (Number(emi.monthPrincipal[i]) + Number(emi.monthInterest[i])) / 1e18,
        "\t   ",
        Number(emi.remaining[i]) / 1e18,
        "\t   ",
        Number(emi.loanPaidTillDate[i]),
      );
    }
    console.log("emi.emi--->>> ", emi.emi);

    console.log(
      "EMItableInterest",
      await emiContract.calculateEMI(100000, 1000, 12, 3),
    );

    exit();
  });
});