// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/Math.sol)

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 z = (a * 10) / b;
        z = z % 10;
        return z < 5 ? (a / b) : (a / b) + 1;
    }

    function sharePercent(
        uint amount,
        uint holdingPercentage
    ) internal pure returns (uint shareAmount) {
        shareAmount = (amount * 1e8 * holdingPercentage) / 10000;
        return shareAmount / 1e8;
    }

    function holdingPercent(
        uint shareAmount,
        uint shareTotalAmount
    ) internal pure returns (uint amount) {
        amount = (shareAmount * 1e8 * 10000) / shareTotalAmount;
        return amount / 1e8;
    }
}
