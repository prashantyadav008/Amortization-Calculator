/** @format */

import { Web3 } from "web3";
import swal from "sweetalert";

import EMI_ABI from "./EMI_ABI.json";

export const Web3Index = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    const chainId = (await web3.eth.getChainId()).toString();

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

export const ContractInstance = async () => {
  let emiContract = process.env.EMI_Contract;
  let emiAbi = EMI_ABI;

  const web3 = await Web3Index();

  let emi = new web3.eth.Contract(emiAbi, emiContract);

  return {
    emi: emi,
  };
};

export const WalletConnection = () => {
  window.addEventListener("load", async () => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      swal("Alert!", "Please install MetaMask!", "warning");
    }
  });

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(parseInt(process.env.REACT_APP_ChainId)),
          },
        ],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(
                  parseInt(process.env.REACT_APP_ChainId)
                ),
                rpcUrls: [process.env.REACT_APP_ALCHEMY_SEPOLIA_API_KEY],
                chainName: process.env.REACT_APP_ALCHEMY_SEPOLIA_NAME,
                nativeCurrency: {
                  name: process.env.REACT_APP_ALCHEMY_SEPOLIA_NAME,
                  symbol: process.env.REACT_APP_ALCHEMY_SEPOLIA_SYMBOL, // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: [
                  process.env.REACT_APP_ALCHEMY_POLYGON_SITE_URL,
                ],
              },
            ],
          });

          // var modal = document.getElementById("myModal");
          // modal.style.display = "none";
        } catch (addError) {
          swal("Error!", "Something went wrong, Network not Added!", "error");
          console.error(addError);
        }
      }
      console.error(error);
    }
  };

  return {
    switchNetwork: switchNetwork,
  };
};
