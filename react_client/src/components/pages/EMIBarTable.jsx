import React, { useState, useEffect } from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

export const EMIBarTable = (props) => {
  const [emiMonth, setEMIMonth] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [principalInterest, setPrincipalInterest] = useState();
  const [eachTotalInterest, setEachTotalInterest] = useState();
  const [eachTotalPrincipal, setEachTotalPrincipal] = useState();
  const [remainingAmount, setRemainingAmount] = useState();

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

    setEMIMonth(emiDetail.emi.toLocaleString("en-IN"));
    setTotalInterest(totalInterest.toLocaleString("en-IN"));
    setPrincipalInterest(totalPrincipal.toLocaleString("en-IN"));

    setEachTotalInterest(emiDetail.monthPrincipal);
    setEachTotalPrincipal(emiDetail.monthInterest);
    setRemainingAmount(emiDetail.remaining);
  };

  return (
    <>
      {/* <table>
        <tbody>
          <tr class="row no-margin">
            <th class="col-2 col-lg-1" id="yearheader">
              Year
            </th>
            <th class="col-sm-2 d-none d-sm-table-cell" id="principalheader">
              Principal
              <br />
              (A)
            </th>
            <th class="col-3 d-table-cell d-sm-none" id="principalheader">
              Principal
            </th>
            <th class="col-sm-2 d-none d-sm-table-cell" id="interestheader">
              Interest
              <br />
              (B)
            </th>
            <th class="col-3 d-table-cell d-sm-none" id="interestheader">
              Interest
            </th>
            <th class="col-sm-3 d-none d-sm-table-cell" id="totalheader">
              Total Payment
              <br />
              (A + B)
            </th>
            <th class="col-4 col-sm-3" id="balanceheader">
              Balance
            </th>
            <th class="col-lg-1 d-none d-lg-table-cell" id="paidtodateheader">
              Loan Paid To Date
            </th>
          </tr>
          <tr class="row no-margin yearlypaymentdetails">
            <td id="year2024" class="col-2 col-lg-1 paymentyear toggle">
              2024
            </td>
            <td class="col-3 col-sm-2 currency">₹ 77,441</td>
            <td class="col-3 col-sm-2 currency">₹ 3,72,422</td>
            <td class="col-sm-3 d-none d-sm-table-cell currency">₹ 4,49,863</td>
            <td class="col-4 col-sm-3 currency">₹ 49,22,559</td>
            <td class="col-lg-1 d-none d-lg-table-cell paidtodateyear">
              1.55%
            </td>
          </tr>
          <tr id="monthyear2024" class="row no-margin monthlypaymentdetails">
            <td class="col-12 monthyearwrapper" colspan="6">
              <div class="monthlypaymentcontainer" style="display: none;">
                <table>
                  <tbody>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Mar</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,486</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,500</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,92,514</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.15%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Apr</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,542</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,444</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,84,971</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.30%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">May</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,599</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,387</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,77,372</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.45%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Jun</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,656</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,330</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,69,716</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.61%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Jul</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,713</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,273</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,62,003</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.76%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Aug</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,771</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,215</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,54,232</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        0.92%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Sep</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,830</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,157</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,46,402</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.07%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Oct</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,888</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,098</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,38,514</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.23%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Nov</td>
                      <td class="col-3 col-sm-2 currency">₹ 7,947</td>
                      <td class="col-3 col-sm-2 currency">₹ 37,039</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,30,566</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.39%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Dec</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,007</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,979</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,22,559</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.55%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr class="row no-margin yearlypaymentdetails">
            <td id="year2025" class="col-2 col-lg-1 paymentyear toggle">
              2025
            </td>
            <td class="col-3 col-sm-2 currency">₹ 1,00,900</td>
            <td class="col-3 col-sm-2 currency">₹ 4,38,936</td>
            <td class="col-sm-3 d-none d-sm-table-cell currency">₹ 5,39,836</td>
            <td class="col-4 col-sm-3 currency">₹ 48,21,659</td>
            <td class="col-lg-1 d-none d-lg-table-cell paidtodateyear">
              3.57%
            </td>
          </tr>
          <tr id="monthyear2025" class="row no-margin monthlypaymentdetails">
            <td class="col-12 monthyearwrapper" colspan="6">
              <div class="monthlypaymentcontainer" style="display: none;">
                <table>
                  <tbody>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Jan</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,067</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,919</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,14,492</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.71%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Feb</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,128</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,859</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 49,06,364</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        1.87%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Mar</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,189</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,798</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,98,176</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.04%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Apr</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,250</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,736</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,89,926</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.20%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">May</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,312</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,674</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,81,614</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.37%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Jun</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,374</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,612</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,73,240</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.54%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Jul</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,437</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,549</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,64,803</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.70%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Aug</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,500</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,486</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,56,303</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        2.87%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Sep</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,564</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,422</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,47,739</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        3.05%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Oct</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,628</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,358</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,39,110</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        3.22%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Nov</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,693</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,293</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,30,417</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        3.39%
                      </td>
                    </tr>
                    <tr class="row no-margin">
                      <td class="col-2 col-lg-1 paymentmonthyear">Dec</td>
                      <td class="col-3 col-sm-2 currency">₹ 8,758</td>
                      <td class="col-3 col-sm-2 currency">₹ 36,228</td>
                      <td class="col-sm-3 d-none d-sm-table-cell currency">
                        ₹ 44,986
                      </td>
                      <td class="col-4 col-sm-3 currency">₹ 48,21,659</td>
                      <td class="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
                        3.57%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr class="row no-margin yearlypaymentdetails">
            <td id="year2026" class="col-2 col-lg-1 paymentyear toggle">
              2026
            </td>
            <td class="col-3 col-sm-2 currency">₹ 1,10,365</td>
            <td class="col-3 col-sm-2 currency">₹ 4,29,470</td>
            <td class="col-sm-3 d-none d-sm-table-cell currency">₹ 5,39,836</td>
            <td class="col-4 col-sm-3 currency">₹ 47,11,294</td>
            <td class="col-lg-1 d-none d-lg-table-cell paidtodateyear">
              5.77%
            </td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};
