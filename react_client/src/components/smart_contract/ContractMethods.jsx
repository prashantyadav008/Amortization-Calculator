/** @format */

import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const { emi } = await ContractInstance();

  const getEMI = async (principal, rate, duration, interestOnlyPeriod) => {
    let emiDetail = await emi.methods
      .amortizationTable(principal, rate, duration, interestOnlyPeriod)
      .call()
      .then((result) => {
        return {
          emi: Number(result[0]),
          interest: Number(result[1]),
          totalInterestPrincipal: Number(result[2]),
          monthPrincipal: result[3].map((value) => {
            return Number(value);
          }),
          monthInterest: result[4].map((value) => {
            return Number(value);
          }),
          remaining: result[5].map((value) => {
            return Number(value);
          }),
          loanPaidTillDate: result[6].map((value) => {
            return Number(value) / 100;
          }),
        };
      })
      .catch((err) => {
        console.log("getEMI error->>>>>>>>>>>", err);
        return false;
      });

    return emiDetail;
  };

  return {
    getEMI: getEMI,
  };
};
