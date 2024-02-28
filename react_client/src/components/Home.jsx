import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../assets/css/jquery-ui.css";
import "../assets/css/calculator.css";
import "../assets/css/custom.css";

import { WalletConnection } from "./smart_contract/Web3Modal";

export const Home = () => {
  const connection = WalletConnection();

  useEffect(() => {}, [connection]);

  const switchNetwork = async () => {
    await connection.switchNetwork();
  };
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content my-4">
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>

          <h5 className="fw-bold my-4">Wrong network connection detected</h5>

          <p className="fw-medium mb-8">
            Looks like your current network selection is not supported. Please{" "}
            <span className="fw-semibold">
              <Link onClick={switchNetwork}>
                Switch to the Polygon blockchain network{" "}
              </Link>
              in your wallet to continue,
            </span>
            or sign out.
          </p>
        </div>
      </div>
    </>
  );
};
