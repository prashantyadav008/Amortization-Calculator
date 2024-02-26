import React, { useState } from "react";

import "../../assets/css/jquery-ui.css";
import "../../assets/css/calculator.css";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(20000000); // Default: ₹25,00,000
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

    let duration = document.getElementById("loanterm").value;
    let newValue = value == "year" ? duration / 12 : duration * 12;

    setLoanTenure({
      value: newValue,
      unit: value,
    });
  };

  const handleSliderChange = (e) => {
    const amount = parseInt(e.target.value);
    setLoanAmount(amount);
  };

  return (
    <>
      <div className="calculatorcontainer">
        <div className="emicalculatorcontainer">
          <div id="loanformcontainer" className="row">
            <div id="emicalculatordashboard" className="col-sm-12">
              <div id="emicalculatorinnerformwrapper">
                <form id="emicalculatorform">
                  <div className="form-horizontal" id="emicalculatorinnerform">
                    {/* Loan Amount */}

                    <div className="row form-group lamount">
                      <label
                        className="col-lg-4 control-label"
                        htmlFor="loanamount">
                        Loan Amount
                      </label>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            id="loanamount"
                            name="loanamount"
                            value={loanAmount}
                            type="number"
                            onChange={handleLoanAmountChange}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">$/₹</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="20000000"
                      step="100000"
                      value={loanAmount}
                      onChange={handleSliderChange}
                      className="ui-slider-range"
                      style={{ width: "100%" }}
                    />
                    <div id="loanamountsteps" className="steps">
                      <span className="tick" style={{ left: "2%" }}>
                        |<br />
                        <span className="marker">0</span>
                      </span>
                      <span
                        className="tick d-none d-sm-table-cell"
                        style={{ left: "14%" }}>
                        |<br />
                        <span className="marker">25L</span>
                      </span>
                      <span className="tick" style={{ left: "26%" }}>
                        |<br />
                        <span className="marker">50L</span>
                      </span>
                      <span
                        className="tick d-none d-sm-table-cell"
                        style={{ left: "38%" }}>
                        |<br />
                        <span className="marker">75L</span>
                      </span>
                      <span className="tick" style={{ left: "50%" }}>
                        |<br />
                        <span className="marker">100L</span>
                      </span>
                      <span
                        className="tick d-none d-sm-table-cell"
                        style={{ left: "62%" }}>
                        |<br />
                        <span className="marker">125L</span>
                      </span>
                      <span className="tick" style={{ left: "74%" }}>
                        |<br />
                        <span className="marker">150L</span>
                      </span>
                      <span
                        className="tick d-none d-sm-table-cell"
                        style={{ left: "86%" }}>
                        |<br />
                        <span className="marker">175L</span>
                      </span>
                      <span className="tick" style={{ left: "98%" }}>
                        |<br />
                        <span className="marker">200L</span>
                      </span>
                    </div>

                    {/* Interest Rate */}
                    <div className="sep row form-group lint">
                      <label
                        className="col-lg-4 control-label"
                        htmlFor="loaninterest">
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
                          onChange={(e) =>
                            setInterestRate(parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </div>

                    <div className="loanInterestSlider">
                      <div
                        id="loaninterestslider"
                        className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                        <div
                          className="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"
                          style={{ width: "26.6667%" }}></div>
                        <span
                          tabIndex="0"
                          className="ui-slider-handle ui-corner-all ui-state-default"
                          style={{ left: "26.6667%" }}></span>
                      </div>

                      <div id="loanintereststeps" className="steps">
                        <span className="tick" style={{ left: "0%" }}>
                          |<br />
                          <span className="marker">5</span>
                        </span>
                        <span className="tick" style={{ left: "16.67%" }}>
                          |<br />
                          <span className="marker">7.5</span>
                        </span>
                        <span className="tick" style={{ left: "33.34%" }}>
                          |<br />
                          <span className="marker">10</span>
                        </span>
                        <span className="tick" style={{ left: "50%" }}>
                          |<br />
                          <span className="marker">12.5</span>
                        </span>
                        <span className="tick" style={{ left: "66.67%" }}>
                          |<br />
                          <span className="marker">15</span>
                        </span>
                        <span className="tick" style={{ left: "83.34%" }}>
                          |<br />
                          <span className="marker">17.5</span>
                        </span>
                        <span className="tick" style={{ left: "100%" }}>
                          |<br />
                          <span className="marker">20</span>
                        </span>
                      </div>
                    </div>

                    {/* Loan Tenure */}
                    <div className="sep row form-group lterm">
                      <label
                        className="col-lg-4 control-label"
                        htmlFor="loanterm">
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
                                setLoanTenure({
                                  ...loanTenure,
                                  value: e.target.value,
                                })
                              }
                            />
                            <div
                              className="input-group-append "
                              data-toggle="buttons">
                              <div
                                className="btn-group btn-group-toggle"
                                data-toggle="buttons">
                                <label
                                  className={`btn btn-light ${
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
                                  className={`btn btn-light ${
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

                    <div className="loanTermSlider">
                      <div
                        id="loantermslider"
                        className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                        <div
                          className="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"
                          style={{ width: "66.6667%" }}></div>
                        <span
                          tabIndex="0"
                          className="ui-slider-handle ui-corner-all ui-state-default"
                          style={{ left: "66.6667%" }}></span>
                      </div>

                      <div id="loantermsteps" className="steps">
                        <span className="tick" style={{ left: "0%" }}>
                          |<br />
                          <span className="marker">0</span>
                        </span>
                        <span className="tick" style={{ left: "16.67%" }}>
                          |<br />
                          <span className="marker">5</span>
                        </span>
                        <span className="tick" style={{ left: "33.33%" }}>
                          |<br />
                          <span className="marker">10</span>
                        </span>
                        <span className="tick" style={{ left: "50%" }}>
                          |<br />
                          <span className="marker">15</span>
                        </span>
                        <span className="tick" style={{ left: "66.67%" }}>
                          |<br />
                          <span className="marker">20</span>
                        </span>
                        <span className="tick" style={{ left: "83.33%" }}>
                          |<br />
                          <span className="marker">25</span>
                        </span>
                        <span className="tick" style={{ left: "100%" }}>
                          |<br />
                          <span className="marker">30</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
