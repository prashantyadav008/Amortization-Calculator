import React, { useState } from "react";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000); // Default: ₹25,00,000
  const [interestRate, setInterestRate] = useState(10.5); // Default: 10.5%
  const [loanTenure, setLoanTenure] = useState({ value: 20, unit: "year" }); // Default: 20 years

  const handleLoanAmountChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      e.target.value >= 0
    ) {
      setLoanAmount(e.target.value);
    }
  };

  const handleInterestRateChange = (e) => {
    const regex = /^(?:100(?:\.0+)?|\d{0,2}(?:\.\d+)?|0(?:\.\d+)?)$/;

    if (
      (e.target.value !== "" && regex.test(e.target.value)) ||
      (e.target.value >= 0 && e.target.value <= 100)
    ) {
      setInterestRate(e.target.value);
    }
  };

  const handleLoanTenureChange = (e) => {
    const value = e.target.value;
    setLoanTenure((prevTenure) => ({
      ...prevTenure,
      unit: value,
    }));
  };

  return (
    <form id="emicalculatorform">
      <div className="form-horizontal" id="emicalculatorinnerform">
        {/* Loan Amount */}
        <div className="row form-group lamount">
          <label className="col-lg-4 control-label" htmlFor="loanamount">
            Home Loan Amount
          </label>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                className="form-control"
                id="loanamount"
                name="loanamount"
                value={loanAmount}
                type="tel"
                onChange={handleLoanAmountChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">$/₹</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/* Interest Rate */}
        <div className="sep row form-group lint">
          <label className="col-lg-4 control-label" htmlFor="loaninterest">
            Interest Rate
          </label>
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="tel"
                className="form-control"
                id="loaninterest"
                name="loaninterest"
                value={interestRate}
                onChange={handleInterestRateChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
          </div>
        </div>
        {/* Loan Tenure */}
        <div className="sep row form-group lterm">
          <label className="col-lg-4 control-label" htmlFor="loanterm">
            Loan Tenure
          </label>
          <div className="col-lg-6">
            <div className="loantermwrapper">
              <div className="input-group">
                <input
                  className="form-control"
                  id="loanterm"
                  name="loanterm"
                  value={loanTenure.value}
                  type="tel"
                  onChange={(e) =>
                    setLoanTenure({ ...loanTenure, value: e.target.value })
                  }
                />
                <div
                  className="input-group-append$/ tenure-choice"
                  data-toggle="buttons">
                  <div
                    className="btn-group btn-group-toggle"
                    data-toggle="buttons">
                    <label
                      className={`btn btn-secondary ${
                        loanTenure.unit === "year" ? "active" : ""
                      }`}>
                      <input
                        type="radio"
                        name="loantenure"
                        value="year"
                        tabIndex="4"
                        autoComplete="off"
                        checked={loanTenure.unit === "year"}
                        onChange={handleLoanTenureChange}
                      />
                      Yr
                    </label>
                    <label
                      className={`btn btn-secondary ${
                        loanTenure.unit === "month" ? "active" : ""
                      }`}>
                      <input
                        type="radio"
                        name="loantenure"
                        value="month"
                        tabIndex="5"
                        autoComplete="off"
                        checked={loanTenure.unit === "month"}
                        onChange={handleLoanTenureChange}
                      />
                      Mo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={loanTenure.value}
              onChange={(e) =>
                setLoanTenure({
                  ...loanTenure,
                  value: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};
