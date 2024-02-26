// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract BasicContract {
    using Math for uint256;
    uint256 private constant Decimal8 = 10 ** 8;
    uint256 private constant Decimal18 = 10 ** 18; // 1e18

    // months = 60 months
    // numerator is for [{r(1+r)^n}]
    // denominator is for [{(1+r)^n}-1]
    function calculate(
        uint256 principalAmt,
        uint256 interest,
        uint256 months,
        uint256 numerator,
        uint256 denominator
    )
        public
        pure
        returns (uint256[] memory, uint256[] memory, uint256, uint256[] memory)
    {
        uint256[] memory interestAmount = new uint256[](months);
        uint256[] memory principal = new uint256[](months);
        uint256[] memory remaining = new uint256[](months);

        // principalAmt = principalAmt * Decimal8;

        uint256 r = (interest * Decimal8) / 120000;
        uint256 monthly = ((principalAmt * Decimal8) * numerator) / denominator;

        monthly = monthly / Decimal8;

        for (uint256 i = 0; i < months; i++) {
            interestAmount[i] = (principalAmt * r) / Decimal8;
            principal[i] = monthly - interestAmount[i];

            if (months > i + 1) {
                principalAmt -= principal[i];
                remaining[i] = principalAmt;
            }
        }
        return (principal, interestAmount, monthly, remaining);
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
        for (uint256 i = 0; i < exponent; i++) {
            // Update the denominator by multiplying it with the base and dividing by the precision factor
            denominator = (denominator * base) / (i > 0 ? Decimal18 : Decimal8);
        }

        return denominator;
    }

    /**
     * @dev Calculates Equated Monthly Installment (EMI) details for a loan.
     * @param principal The initial loan amount.
     * @param interest The annual interest rate expressed in basis points (1% = 100 basis points).
     * @param months The total number of months for the loan repayment period.
     * @return emi The fixed monthly installment amount including both principal and interest components.
     * @return monthPrincipal An array representing the principal component of each monthly installment.
     * @return monthInterest An array representing the interest component of each monthly installment.
     * @return remaining An array indicating the remaining loan amount after each monthly payment.
     */
    function calculateEMI(
        uint256 principal,
        uint256 interest,
        uint256 months
    )
        external
        pure
        returns (uint256, uint256[] memory, uint256[] memory, uint256[] memory)
    {
        // Arrays to store details for each month
        uint256[] memory monthInterest = new uint256[](months);
        uint256[] memory monthPrincipal = new uint256[](months);
        uint256[] memory remaining = new uint256[](months);
        uint emi = 0;
        // Calculate monthly interest rate and the factor for EMI calculation
        uint256 r = (interest * Decimal18) / 120000;
        uint256 factor = Decimal18 + r;

        // Calculate EMI using the formula for present value of annuity
        uint power = factorial(factor, months);
        uint numerator = (power * r) / Decimal18;
        uint denominator = power - Decimal18;

        // emi = (principal * numerator) / denominator;
        emi = Math.ceilDiv((principal * numerator), denominator);
        // console.log(emi, emi * months);

        // Calculate and store month-wise principal, interest, and remaining amount
        for (uint256 i = 0; i < months; i++) {
            monthInterest[i] = Math.ceilDiv(principal * r, Decimal18);
            monthPrincipal[i] = emi - monthInterest[i];

            if (months > i + 1) {
                principal -= monthPrincipal[i];
                remaining[i] = principal;
            }
        }

        return (emi, monthPrincipal, monthInterest, remaining);
    }

    /**
     * @dev Calculates the penalty for a late payment in a loan contract.
     *
     * This method determines the penalty amount based on the remaining loan amount, penalty rate,
     * and the number of days the payment is overdue. It ensures the penalty is proportional to
     * the outstanding amount and the delay in payment.
     *
     * @param remainingAmount The remaining loan amount after the last payment.
     * @param penaltyRate The penalty rate applied to the outstanding amount (in basis points).
     * @param daysLate The number of days the payment is overdue.
     *
     * @return penaltyAmount The calculated penalty amount for the late payment.
     * The penalty is computed as (remainingAmount * penaltyRate * daysLate) / (Decimal18 * 365),
     * where Decimal18 is the decimal precision for calculations. The function ensures that the
     * penalty amount does not exceed the remaining loan amount.
     */
    function calculatePenalty(
        uint256 remainingAmount,
        uint256 penaltyRate,
        uint256 daysLate
    ) external pure returns (uint256 penaltyAmount) {
        // Calculate the penalty using the penalty rate and the remaining amount
        penaltyAmount =
            (remainingAmount * penaltyRate * daysLate) /
            (Decimal18 * 365);

        // Ensure the penalty is non-negative
        if (penaltyAmount > remainingAmount) {
            penaltyAmount = remainingAmount;
        }

        return penaltyAmount;
    }
}
