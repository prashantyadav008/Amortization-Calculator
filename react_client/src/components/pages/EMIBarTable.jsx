/** @format */

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

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

  const [openYear, setOpenYear] = useState(null); // State to manage which year is open

  const toggleYear = (yearIndex) => {
    setOpenYear(openYear === yearIndex ? null : yearIndex);
  };

  const currentMonth = new Date().getMonth(); // Get the current month (0-11)
  const currentYear = new Date().getFullYear(); // Get the current year

  const renderMonthlyDetails = () => {
    let monthlyRows = [];
    let totalPrincipal = [0];
    let totalInterest = [0];
    let totalPayment = [0];
    let totalRemaining = [0];
    let totalPaidToDate = [0];

    monthPrincipal.forEach((principal, index) => {
      const yearOffset = Math.floor((currentMonth + index) / 12);

      totalPrincipal[yearOffset] =
        (totalPrincipal[yearOffset] || 0) + principal;
      totalInterest[yearOffset] =
        (totalInterest[yearOffset] || 0) + monthInterest[index];
      totalPayment[yearOffset] =
        (totalPayment[yearOffset] || 0) + principal + monthInterest[index];
      totalRemaining[yearOffset] = remaining[index];
      totalPaidToDate[yearOffset] = loanPaidTillDate[index];
    });

    monthPrincipal.forEach((principal, index) => {
      const monthIndex = (currentMonth + index) % 12;
      const yearOffset = Math.floor((currentMonth + index) / 12);
      const displayYear = currentYear + yearOffset;

      if (index === 0 || monthIndex === 0) {
        monthlyRows.push(
          <React.Fragment key={`year-${displayYear}`}>
            <tr
              className="row no-margin yearlypaymentdetails"
              onClick={() => toggleYear(yearOffset)}>
              <td
                className="col-2 col-lg-1 paymentyear toggle"
                style={{ fontSize: "15px" }}>
                {openYear === yearOffset ? "⊟" : "⊞"} {displayYear}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {totalPrincipal[yearOffset].toLocaleString()}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {totalInterest[yearOffset].toLocaleString()}
              </td>
              <td className="col-sm-3 d-none d-sm-table-cell currency">
                ₹ {totalPayment[yearOffset].toLocaleString()}
              </td>
              <td className="col-4 col-sm-3 currency">
                ₹ {totalRemaining[yearOffset].toLocaleString()}
              </td>
              <td className="col-lg-1 d-none d-lg-table-cell paidtodateyear">
                {totalPaidToDate[yearOffset]}%
              </td>
            </tr>
          </React.Fragment>
        );
      }

      if (openYear === yearOffset) {
        const monthRow = (
          <tr
            key={`month-${index}`}
            className="row no-margin"
            style={{ backgroundColor: "#dedede" }}>
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
      }
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
