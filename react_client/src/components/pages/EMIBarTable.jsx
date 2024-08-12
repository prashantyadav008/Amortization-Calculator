/** @format */

import React, { useEffect } from "react";

export const EMIBarTable = (props) => {
  useEffect(() => {
    setAllValues();
  }, [props]);

  const setAllValues = async () => {
    console.log("EMI Details ->", props?.emiDetail);
  };

  const { loanPaidTillDate, monthInterest, monthPrincipal, remaining } =
    props?.emiDetail || {};

  const currentMonth = new Date().getMonth(); // Get the current month (0-11)

  const renderYearlyDetails = () => {
    let yearlyRows = [];
    let year = 2024;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let yearlyRemaining = 0;

    monthPrincipal.forEach((principal, index) => {
      yearlyPrincipal += principal;
      yearlyInterest += monthInterest[index];
      yearlyRemaining = remaining[index];

      const monthIndex = (currentMonth + index) % 12;
      const yearOffset = Math.floor((currentMonth + index) / 12);
      const displayYear = 2024 + yearOffset;

      // Check if it's January, create yearly summary row
      if (monthIndex === 0 && index !== 0) {
        const totalPayment = yearlyPrincipal + yearlyInterest;
        const paidToDate = loanPaidTillDate[index - 1]; // Previous month's paid to date percentage

        const yearlyRow = (
          <React.Fragment key={`year-${displayYear - 1}`}>
            <tr className="row no-margin yearlypaymentdetails">
              <td className="col-2 col-lg-1 paymentyear toggle">
                {displayYear - 1}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {yearlyPrincipal.toLocaleString()}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {yearlyInterest.toLocaleString()}
              </td>
              <td className="col-sm-3 d-none d-sm-table-cell currency">
                ₹ {totalPayment.toLocaleString()}
              </td>
              <td className="col-4 col-sm-3 currency">
                ₹ {yearlyRemaining.toLocaleString()}
              </td>
              <td className="col-lg-1 d-none d-lg-table-cell paidtodateyear">
                {paidToDate}%
              </td>
            </tr>
          </React.Fragment>
        );

        yearlyRows.push(yearlyRow);

        // Reset yearly totals
        yearlyPrincipal = principal;
        yearlyInterest = monthInterest[index];
        yearlyRemaining = remaining[index];
      }

      // Handle last year
      if (index === monthPrincipal.length - 1) {
        const totalPayment = yearlyPrincipal + yearlyInterest;
        const paidToDate = loanPaidTillDate[index];

        const yearlyRow = (
          <React.Fragment key={`year-${displayYear}`}>
            <tr className="row no-margin yearlypaymentdetails">
              <td className="col-2 col-lg-1 paymentyear toggle">
                {displayYear}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {yearlyPrincipal.toLocaleString()}
              </td>
              <td className="col-3 col-sm-2 currency">
                ₹ {yearlyInterest.toLocaleString()}
              </td>
              <td className="col-sm-3 d-none d-sm-table-cell currency">
                ₹ {totalPayment.toLocaleString()}
              </td>
              <td className="col-4 col-sm-3 currency">
                ₹ {yearlyRemaining.toLocaleString()}
              </td>
              <td className="col-lg-1 d-none d-lg-table-cell paidtodateyear">
                {paidToDate}%
              </td>
            </tr>
          </React.Fragment>
        );

        yearlyRows.push(yearlyRow);
      }
    });

    return yearlyRows;
  };

  const renderMonthlyDetails = () => {
    let monthlyRows = [];
    let year = 2024;

    monthPrincipal.forEach((principal, index) => {
      const monthIndex = (currentMonth + index) % 12;
      const yearOffset = Math.floor((currentMonth + index) / 12);
      const displayYear = 2024 + yearOffset;

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

  const yearlyDetails = renderYearlyDetails();
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
          {yearlyDetails.map((yearRow, i) => (
            <React.Fragment key={`year-section-${i}`}>
              {yearRow}
              {monthlyDetails.slice(i * 12, (i + 1) * 12)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
