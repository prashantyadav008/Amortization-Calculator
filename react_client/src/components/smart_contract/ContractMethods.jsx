/** @format */

import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const { emi } = await ContractInstance();

  const getEMI = async (principal, rate, duration, interestOnlyPeriod) => {
    let emiDetail = await emi.methods
      .calculateEMI(principal, rate, duration, interestOnlyPeriod)
      .call()
      .then((result) => {
        // eslint-disable-next-line no-unused-vars
        let monthPrincipal = result[1].map((principal) => {
          return Number(principal);
        });

        // eslint-disable-next-line no-unused-vars
        let monthInterest = result[2].map((interest) => {
          return Number(interest);
        });

        // eslint-disable-next-line no-unused-vars
        let remaining = result[3].map((remaining) => {
          return Number(remaining);
        });

        return {
          emi: 1,
        };
      })
      .catch((err) => {
        console.log("getEMI ->>>>>>>>>>>", err);
        return false;
      });

    return emiDetail;
  };

  return {
    getEMI: getEMI,
  };
};
