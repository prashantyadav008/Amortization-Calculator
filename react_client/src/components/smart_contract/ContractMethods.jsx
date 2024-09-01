/** @format */

import { Web3 } from "web3";
import EMI_ABI from "./EMI_ABI.json";

const Web3Index = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    const chainId = (await web3.eth.getChainId()).toString();

    // eslint-disable-next-line no-undef
    if (chainId !== process.env.REACT_APP_ChainId) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    } else {
      try {
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });
};

const ContractInstance = async () => {
  // eslint-disable-next-line no-undef
  let emiContract = process.env.EMI_Contract;
  let emiAbi = EMI_ABI;

  const web3 = await Web3Index();

  let emi = new web3.eth.Contract(emiAbi, emiContract);

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
