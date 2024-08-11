// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface ICalculateEMI {
    struct EMITable {
        uint256 emi;
        uint256 totalInterest;
        uint256 totalPrincipal;
        uint256[] monthPrincipal;
        uint256[] monthInterest;
        uint256[] remaining;
        uint256[] loanPaidTillDate;
    }

    /**
     * @dev Calculates Equated Monthly Installment (EMI) details for a loan.
     * @param principal The initial loan amount.
     * @param interest The annual interest rate expressed in basis points (1% = 100 basis points).
     * @param months The total number of months for the loan repayment period.
     */
    function calculateEMI(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint interestOnlyPeriod
    )
        external
        pure
        returns (
            uint256 emiMonths,
            uint256 totalInterest,
            uint256 totalInterestPrincipal
        );

    function amortizationTable(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint256 interestOnlyPeriod
    ) external pure returns (EMITable memory);

    function calculateEMITable(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint256 interestOnlyPeriod,
        uint firstIndex,
        uint lastIndex
    )
        external
        pure
        returns (
            uint monthDifference,
            uint principalAmount,
            uint interestAmount
        );
}
