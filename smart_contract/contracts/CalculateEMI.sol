// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// import "hardhat/console.sol";
import "./Math.sol";
import "./ICalculateEMI.sol";

contract CalculateEMI is ICalculateEMI {
    using Math for uint256;
    uint256 private constant Decimal8 = 10 ** 8;
    uint256 private constant Decimal18 = 10 ** 18; // 1e18

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
        uint256 interestOnlyPeriod
    ) external pure returns (uint256, uint256, uint256) {
        EMITable memory e1 = _amortizationTable(
            principal,
            interest,
            months,
            interestOnlyPeriod
        );

        return (e1.emi, e1.totalInterest, e1.totalInterest + e1.totalPrincipal);
    }

    /**
     * @dev Calculates the interest and principal components for a loan contract.
     * @param principal The initial loan amount.
     * @param interest The annual interest rate expressed in basis points (1% = 100 basis points).
     * @param months The total number of months for the loan repayment period.
     */
    function _calculateInterestPrincipal(
        uint256 principal,
        uint256 interest,
        uint256 months
    )
        internal
        pure
        returns (
            uint256 emiMonths,
            uint256 totalInterest,
            uint256 totalInterestPrincipal
        )
    {
        (, emiMonths) = _calculateEMIMonth(principal, interest, months);

        totalInterestPrincipal = emiMonths * months;
        totalInterest = totalInterestPrincipal - principal;

        return (emiMonths, totalInterest, totalInterestPrincipal);
    }

    /**
     * @dev Calculates the monthly installment amount for a loan contract.
     * @param principal The initial loan amount.
     * @param interest The annual interest rate expressed in basis points (1% = 100 basis points).
     * @param months The total number of months for the loan repayment period.
     * @return remainder The remainder of the monthly installment amount.
     * @return emiAmount The monthly installment amount.
     */
    function _calculateEMIMonth(
        uint256 principal,
        uint256 interest,
        uint256 months
    ) internal pure returns (uint256 remainder, uint emiAmount) {
        // Calculate monthly interest rate and the factor for EMI calculation
        remainder = (interest * Decimal18) / 120000;
        uint256 factor = Decimal18 + remainder;

        // Calculate EMI using the formula for present value of annuity
        uint power = factorial(factor, months);
        uint numerator = (power * remainder) / Decimal18;
        uint denominator = power - Decimal18;

        // Calculate emiAmount
        emiAmount = Math.ceilDiv((principal * numerator), denominator);

        return (remainder, emiAmount);
    }

    /**
     * @dev Calculates the factorial of a number with a given exponent.
     * @param base The base value for the factorial calculation.
     * @param exponent The exponent for the factorial calculation.
     * @return result The result of the factorial calculation.
     */
    function factorial(
        uint256 base,
        uint256 exponent
    ) internal pure returns (uint256 result) {
        // Initialize the denominator with a precision factor
        uint256 denominator = Decimal8;

        // Calculate the factorial using the given base and exponent
        for (uint256 i = 0; i < exponent; ) {
            // Update the denominator by multiplying it with the base and dividing by the precision factor

            unchecked {
                denominator =
                    (denominator * base) /
                    (i > 0 ? Decimal18 : Decimal8);
                i++;
            }
        }

        return denominator;
    }

    function amortizationTable(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint256 interestOnlyPeriod
    ) external pure returns (EMITable memory) {
        return
            _amortizationTable(principal, interest, months, interestOnlyPeriod);
    }

    function _amortizationTable(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint256 interestOnlyPeriod
    ) private pure returns (EMITable memory) {
        EMITable memory e1;
        // Initialize arrays
        e1.monthPrincipal = new uint256[](months);
        e1.monthInterest = new uint256[](months);
        e1.remaining = new uint256[](months);
        e1.loanPaidTillDate = new uint256[](months);

        (uint r, uint emiAmount) = _calculateEMIMonth(
            principal,
            interest,
            months
        );

        uint totalPrincipal = 0;
        uint totalPrincipalAmount = principal;

        // Calculate and store month-wise principal, interest, and remaining amount
        for (uint256 i = 0; i < months; ) {
            if (i < interestOnlyPeriod) {
                e1.monthInterest[i] = Math.ceilDiv(
                    totalPrincipalAmount * r,
                    Decimal18
                );
                e1.remaining[i] = totalPrincipalAmount;
            } else {
                (emiAmount, , ) = _calculateInterestPrincipal(
                    totalPrincipalAmount,
                    interest,
                    months - interestOnlyPeriod
                );

                e1.emi = emiAmount;

                e1.monthInterest[i] = Math.ceilDiv(principal * r, Decimal18);
                e1.monthPrincipal[i] = emiAmount - e1.monthInterest[i];

                if (months == i + 1) {
                    e1.loanPaidTillDate[i] = 10000;
                } else {
                    totalPrincipal += e1.monthPrincipal[i];

                    e1.loanPaidTillDate[i] =
                        (totalPrincipal * 10000) /
                        totalPrincipalAmount;
                }

                if (months > i + 1) {
                    principal -= e1.monthPrincipal[i];
                    e1.remaining[i] = principal;
                }
            }

            e1.totalInterest += e1.monthInterest[i];
            e1.totalPrincipal += e1.monthPrincipal[i];

            unchecked {
                i++;
            }
        }

        return (e1);
    }

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
        )
    {
        EMITable memory e1 = _amortizationTable(
            principal,
            interest,
            months,
            interestOnlyPeriod
        );

        if (firstIndex > months) {
            firstIndex = months;
        }

        if (lastIndex > months) {
            lastIndex = months;
        }

        monthDifference = lastIndex - firstIndex;

        if (lastIndex == 0 && firstIndex == 0) {
            lastIndex = 1;
        }

        if (lastIndex == months) {
            lastIndex = lastIndex - 1;
        }

        for (uint i = firstIndex; i <= lastIndex; ) {
            unchecked {
                principalAmount += e1.monthPrincipal[i];
                interestAmount += e1.monthInterest[i];
                i++;
            }
        }

        return (monthDifference, principalAmount, interestAmount);
    }

    function calculateMinimumPrepayment(
        uint256 principal,
        uint256 interest,
        uint256 months,
        uint256 interestOnlyPeriod,
        uint firstIndex,
        uint lastIndex,
        uint balance
    ) external pure returns (uint monthDifference) {
        EMITable memory e1 = _amortizationTable(
            principal,
            interest,
            months,
            interestOnlyPeriod
        );

        if (firstIndex > months) {
            firstIndex = months;
        }

        for (uint i = firstIndex; i < lastIndex; ) {
            if (e1.remaining[i] >= balance) {
                monthDifference = i;
            } else {
                break;
            }

            unchecked {
                i++;
            }
        }

        return monthDifference;
    }
}
