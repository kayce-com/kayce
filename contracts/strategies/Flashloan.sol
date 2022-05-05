// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/utils/math/SafeMath.sol";
import "../libraries/interface/IPancakeERC20.sol";
import "../libraries/interface/IPancakeRouter.sol";
import "../libraries/PancakeArbitrageLibrary.sol";
import "../libraries/interface/IPancakePair.sol";
import "../libraries/interface/IPancakeFactory.sol";

/// @title BSC Flashloan/Arbitrage Strategy
/// @author davidkayce
/// @author Modified from Julian (eattheblocks) (https://github.com/jklepatch/eattheblocks)
/// @notice A simple contract to execute flashloan based arbitrage on BSC between pancakeswap and bakeryswap

contract FlashloanStrategy {
    IPancakeRouter public bakeryRouter;
    IPancakeRouter public pancakeRouter;
    IPancakeFactory public pancakeFactory;

    address PancakeFactory;
    bytes arbdata;

    // TODO: Include uniswap to sushiswap pending lower ETH fees
    enum Direction {
        BakerytoPancake,
        PancaketoBakery
    }

    struct ArbInfo {
        Direction direction;
        uint256 repayAmount;
    }

    constructor(
        address _pancakeFactory,
        address _bakeryRouter,
        address _pancakeRouter // version 2
    ) public {
        pancakeFactory = IPancakeFactory(_pancakeFactory);
        bakeryRouter = IPancakeRouter(_bakeryRouter);
        pancakeRouter = IPancakeRouter(_pancakeRouter);
        PancakeFactory = _pancakeFactory;
    }

    function startArbitrage(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1,
        Direction _direction,
        uint256 repayAmount
    ) external {
        arbdata = abi.encode(
            ArbInfo({direction: _direction, repayAmount: repayAmount})
        );
        address pairAddress = IPancakeFactory(pancakeFactory).getPair(
            token0,
            token1
        );
        require(pairAddress != address(0), "This pool does not exist");
        IPancakePair(pairAddress).swap(
            amount0,
            amount1,
            address(this),
            bytes("not empty") //not empty bytes param will trigger flashloan
        );
    }

    function pancakeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata data
    ) external {
        ArbInfo memory arbInfo = abi.decode(arbdata, (ArbInfo));
        uint256 amountToken = _amount0 == 0 ? _amount1 : _amount0;

        address token0 = IPancakePair(msg.sender).token0();
        address token1 = IPancakePair(msg.sender).token1();

        require(
            msg.sender ==
                PancakeLibrary.pairFor(PancakeFactory, token0, token1),
            "Unauthorized"
        );
        require(_amount0 == 0 || _amount1 == 0);

        IPancakeERC20 token = IPancakeERC20(_amount0 == 0 ? token1 : token0);

        if (arbInfo.direction == Direction.BakerytoPancake) {
            token.approve(address(bakeryRouter), amountToken);
            address[] memory path = new address[](2);
            path[0] = address(token0);
            path[1] = address(token1);
            uint256[] memory minOuts = bakeryRouter.getAmountsOut(
                amountToken,
                path
            );
            bakeryRouter.swapExactTokensForETH(
                token.balanceOf(address(this)),
                minOuts[1],
                path,
                address(this),
                block.timestamp
            );

            address[] memory path2 = new address[](2);
            path2[0] = address(token1);
            path2[1] = address(token0);
            uint256[] memory minOuts2 = pancakeRouter.getAmountsOut(
                address(this).balance,
                path2
            );
            pancakeRouter.swapExactETHForTokens{value: address(this).balance}(
                minOuts2[1],
                path2,
                address(this),
                block.timestamp
            );
        } else {
            token.approve(address(pancakeRouter), amountToken);
            address[] memory path = new address[](2);
            path[0] = address(token0);
            path[1] = address(token1);
            uint256[] memory minOuts = pancakeRouter.getAmountsOut(
                amountToken,
                path
            );

            pancakeRouter.swapExactTokensForETH(
                token.balanceOf(address(this)),
                minOuts[1],
                path,
                address(this),
                block.timestamp
            );

            address[] memory path2 = new address[](2);
            path2[0] = address(token1);
            path2[1] = address(token0);
            uint256[] memory minOuts2 = bakeryRouter.getAmountsOut(
                address(this).balance,
                path2
            );

            bakeryRouter.swapExactETHForTokens{value: address(this).balance}(
                minOuts2[1],
                path2,
                address(this),
                block.timestamp
            );
        }
        uint256 profit = token.balanceOf(address(this)) - arbInfo.repayAmount;
        token.transfer(msg.sender, arbInfo.repayAmount);
        token.transfer(tx.origin, profit);
    }
}
