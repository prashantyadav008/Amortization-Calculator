/** @format */

import { Web3 } from "web3";
import EMI_ABI from "./EMI_ABI.json";

const ContractInstance = async () => {
  // eslint-disable-next-line no-undef
  let emiContract = process.env.REACT_APP_EMI_Contract;
  let emiAbi = EMI_ABI;

  // eslint-disable-next-line no-undef
  const providerUrl = process.env.REACT_APP_ALCHEMY_SEPOLIA_API_KEY;

  // Create a new Web3 instance using the provider URL
  const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

  let emi = new web3.eth.Contract(emiAbi, emiContract);

  console.log(emi);

  return {
    emi: emi,
  };
};

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
