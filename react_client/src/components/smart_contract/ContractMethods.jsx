import { ContractInstance } from "./Web3Modal";

export const ContractMethods = async () => {
  const { emi } = await ContractInstance();

  const getEMI = async (principal, rate, duration) => {
    let owner = await emi.methods
      .calculateEMI(principal, rate, duration)
      .call()
      .then((result) => {
        let emi = result[0];
        let monthPrincipal = result[1];
        let monthInterest = result[2];
        let remaining = result[3];
        return {
          emi: emi,
          monthPrincipal: monthPrincipal,
          monthInterest: monthInterest,
          remaining: remaining,
        };
      })
      .catch((err) => {
        console.log("getEMI ->>>>>>>>>>>", err);
        return false;
      });

    console.log("owner-->", owner);

    return owner;
  };

  return {
    getEMI: getEMI,
  };
};
