// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract BasicContract {
    string message = "Hello Coders!";

    event Messages(string oldMessage, string newMessage, address changedBy);

    function updateMessage(string memory _newMessage) public {
        emit Messages(message, _newMessage, msg.sender);
        message = _newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

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

            // console.log(months, i + 1);
            if (months > i + 1) {
                principalAmt -= principal[i];
                remaining[i] = principalAmt;
            }
        }
        return (principal, interestAmount, monthly, remaining);
    }

    function factorial(
        uint256 base,
        uint256 exponent
    ) internal pure returns (uint256 result) {
        uint256 denominator = 10 ** 8;
        for (uint256 i = 0; i < exponent; i++) {
            denominator = (denominator * base) / Decimal18;
            // console.log(denominator, base, (denominator * base), Decimal18);
        }
        return denominator;
    }

    function calculateEMI(
        uint256 principal,
        uint256 interest,
        uint256 months
    )
        external
        pure
        returns (uint256, uint256[] memory, uint256[] memory, uint256[] memory)
    {
        uint256[] memory monthInterest = new uint256[](months);
        uint256[] memory monthPrincipal = new uint256[](months);
        uint256[] memory remaining = new uint256[](months);

        uint256 r = (interest * Decimal18) / 120000;
        uint256 factor = Decimal18 + r;

        uint power = factorial(factor, months);
        uint numerator = (power * r) / Decimal18;
        uint denominator = power - Decimal8;

        uint256 emi = Math.ceilDiv(principal * numerator, denominator);

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
}
