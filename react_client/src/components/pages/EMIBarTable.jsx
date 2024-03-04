import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

export const EMIBarTable = (props) => {
  // const [emiMonth, setEMIMonth] = useState();
  // const [totalInterest, setTotalInterest] = useState();
  // const [principalInterest, setPrincipalInterest] = useState();
  // const [eachTotalInterest, setEachTotalInterest] = useState();
  // const [eachTotalPrincipal, setEachTotalPrincipal] = useState();
  // const [remainingAmount, setRemainingAmount] = useState();

  useEffect(() => {
    setAllValues();
  }, [props]);

  const setAllValues = async () => {
    let monthlyEMI = props.monthlyEMI;
    let years =
      props.interest.unit == "year"
        ? props.interest.value * 12
        : props.interest.value;

    let totalPrincipal = monthlyEMI * years;
    let totalInterest = totalPrincipal - props.principal;

    // setEMIMonth(emiDetail.emi.toLocaleString("en-IN"));
    // setTotalInterest(totalInterest.toLocaleString("en-IN"));
    // setPrincipalInterest(totalPrincipal.toLocaleString("en-IN"));

    // setEachTotalInterest(emiDetail.monthPrincipal);
    // setEachTotalPrincipal(emiDetail.monthInterest);
    // setRemainingAmount(emiDetail.remaining);
  };

  return (
    <>
      <table>
        <tbody>
          <tr className="row no-margin">
            <th className="col-2 col-lg-1" id="yearheader">
              Year
            </th>
            <th
              className="col-sm-2 d-none d-sm-table-cell"
              id="principalheader">
              Principal
              <br />
              (A)
            </th>
            <th className="col-3 d-table-cell d-sm-none" id="principalheader">
              Principal
            </th>
            <th className="col-sm-2 d-none d-sm-table-cell" id="interestheader">
              Interest
              <br />
              (B)
            </th>
            <th className="col-3 d-table-cell d-sm-none" id="interestheader">
              Interest
            </th>
            <th className="col-sm-3 d-none d-sm-table-cell" id="totalheader">
              Total Payment
              <br />
              (A + B)
            </th>
            <th className="col-4 col-sm-3" id="balanceheader">
              Balance
            </th>
            <th
              className="col-lg-1 d-none d-lg-table-cell"
              id="paidtodateheader">
              Loan Paid To Date
            </th>
          </tr>
          <tr className="row no-margin yearlypaymentdetails">
            <td id="year2024" className="col-2 col-lg-1 paymentyear toggle">
              2024
            </td>
            <td className="col-3 col-sm-2 currency">₹ 77,441</td>
            <td className="col-3 col-sm-2 currency">₹ 3,72,422</td>
            <td className="col-sm-3 d-none d-sm-table-cell currency">
              ₹ 4,49,863
            </td>
            <td className="col-4 col-sm-3 currency">₹ 49,22,559</td>
            <td className="col-lg-1 d-none d-lg-table-cell paidtodateyear">
              1.55%
            </td>
          </tr>
          <tr
            id="monthyear2024"
            className="row no-margin monthlypaymentdetails">
            <td className="col-12 monthyearwrapper" colSpan="6">
              <div className="monthlypaymentcontainer">
                <table>
                  <tbody>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Mar</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,486</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,500</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,92,514</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.15%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Apr</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,542</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,444</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,84,971</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.30%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">May</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,599</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,387</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,77,372</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.45%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Jun</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,656</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,330</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,69,716</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.61%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Jul</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,713</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,273</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,62,003</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.76%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Aug</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,771</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,215</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,54,232</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.92%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Sep</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,830</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,157</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,46,402</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.07%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Oct</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,888</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,098</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,38,514</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.23%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Nov</td>
                      <td className="col-3 col-sm-2 currency">₹ 7,947</td>
                      <td className="col-3 col-sm-2 currency">₹ 37,039</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,30,566</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.39%
                      </td>
                    </tr>
                    <tr className="row no-margin">
                      <td className="col-2 col-lg-1 paymentmonthyear">Dec</td>
                      <td className="col-3 col-sm-2 currency">₹ 8,007</td>
                      <td className="col-3 col-sm-2 currency">₹ 36,979</td>
                      <td className="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td className="col-4 col-sm-3 currency">₹ 49,22,559</td>
                      <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.55%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr className="row no-margin yearlypaymentdetails">
            <td id="year2025" className="col-2 col-lg-1 paymentyear toggle">
              2025
            </td>
            <td className="col-3 col-sm-2 currency">₹ 1,00,900</td>
            <td className="col-3 col-sm-2 currency">₹ 4,38,936</td>
            <td className="col-sm-3 d-none d-sm-table-cell currency">
              ₹ 5,39,836
            </td>
            <td className="col-4 col-sm-3 currency">₹ 48,21,659</td>
            <td className="col-lg-1 d-none d-lg-table-cell paidtodateyear">
              3.57%
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
