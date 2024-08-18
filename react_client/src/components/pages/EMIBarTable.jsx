/** @format */

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

export const EMIBarTable = (props) => {
  useEffect(() => {
    setAllValues();
  }, [props]);

  const setAllValues = async () => {
    // eslint-disable-next-line react/prop-types
  };

  const { loanPaidTillDate, monthInterest, monthPrincipal, remaining } =
    // eslint-disable-next-line react/prop-types
    props.emiDetail || {};

  const currentMonth = new Date().getMonth(); // Get the current month (0-11)
  const currentYear = new Date().getFullYear(); // Get the current year

  const renderMonthlyDetails = () => {
    let monthlyRows = [];

    monthPrincipal.forEach((principal, index) => {
      const monthIndex = (currentMonth + index) % 12;
      const yearOffset = Math.floor((currentMonth + index) / 12);
      const displayYear = currentYear + yearOffset;

      if (index === 0 || monthIndex === 0) {
        monthlyRows.push(
          <tr key={`year-${displayYear}`} className="row no-margin">
            <td className="col-12 year-header">{displayYear}</td>
          </tr>
        );
      }

      const monthRow = (
        <tr key={`month-${index}`} className="row no-margin">
          <td className="col-2 col-lg-1 paymentmonthyear">
            {new Date(displayYear, monthIndex).toLocaleString("default", {
              month: "short",
            })}
          </td>
          <td className="col-3 col-sm-2 currency">
            ₹ {principal.toLocaleString()}
          </td>
          <td className="col-3 col-sm-2 currency">
            ₹ {monthInterest[index].toLocaleString()}
          </td>
          <td className="col-sm-3 d-none d-sm-table-cell currency">
            ₹ {(principal + monthInterest[index]).toLocaleString()}
          </td>
          <td className="col-4 col-sm-3 currency">
            ₹ {remaining[index].toLocaleString()}
          </td>
          <td className="col-lg-1 d-none d-lg-table-cell paidtodatemonthyear">
            {loanPaidTillDate[index]}%
          </td>
        </tr>
      );

      monthlyRows.push(monthRow);
    });

    return monthlyRows;
  };

  const monthlyDetails = renderMonthlyDetails();

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
          {monthlyDetails}
        </tbody>
      </table>
    </>
  );
};
