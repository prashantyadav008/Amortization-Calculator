import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const { emi } = await ContractInstance();

  const getEMI = async (principal, rate, duration) => {
    let emiDetail = await emi.methods
      .calculateEMI(principal, rate, duration)
      .call()
      .then((result) => {
        let monthPrincipal = result[1].map((principal) => {
          return Number(principal);
        });

        let monthInterest = result[2].map((interest) => {
          return Number(interest);
        });

        let remaining = result[3].map((remaining) => {
          return Number(remaining);
        });

        return {
          emi: Number(result[0]),
          monthPrincipal: monthPrincipal,
          monthInterest: monthInterest,
          remaining: remaining,
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
