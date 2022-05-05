require("dotenv").config();

import Web3 from "web3";
import { livenodes, routerBSC, factoryBSC, tokensBSC } from "../config";
import { pancakeSwap, bakerySwap } from "../config/abi";
import FlashLoan from "./build/contracts/Flashloan.json";

const BSCWeb3 = new Web3(new Web3.providers.WebsocketProvider(livenodes.bsc));
const ETHWeb3 = new Web3(new Web3.providers.WebsocketProvider(livenodes.eth));

const { address: admin } = BSCWeb3.eth.accounts.wallet.add(
  process.env.PRIVATE_KEY
);
const initAmount = web3.utils.toBN(web3.utils.toWei("1")); // initial amount in dai (1 DAI)

const DIRECTION = {
  BAKERY_TO_PANCAKE: 0,
  PANCAKE_TO_BAKERY: 1,
};

// Get pancakeSwap and bakerySwap router contracts
const PancakeSwap = new web3.eth.Contract(
  pancakeSwap.router,
  routerBSC.pancakeSwap
);

const BakerySwap = new web3.eth.Contract(
  bakerySwap.router,
  routerBSC.bakerySwap
);

// Figure out how tuning this value affects perfomance

const handleArbitrage = (direction, repayAmount, flashloan) => {
  let tx = flashloan.methods.startArbitrage(
    addresses.tokens.DAI,
    addresses.tokens.WBNB,
    amountInDai,
    0,
    direction,
    repayAmount.toString()
  );
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: flashloan.options.address,
    data,
    gas: gas,
    gasPrice: gasPrice,
  };

  const receipt = await web3.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
};


const init = async () => {
  const repayAmount = amountInDai - amountInDai * 0.997 + amountInDai;
  const networkId = await web3.eth.net.getId();
  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );

  // Listen to new blocks
  BSCWeb3.eth
    .subscribe("newBlockHeaders")
    .on("data", async (block) => {
      console.log(`New block received. Block # ${block.number}`);

      const firstSwap = await PancakeSwap.methods
        .getAmountsOut(initAmount, [tokensBSC.DAI, tokensBSC.WBNB])
        .call();

      const secondSwap = await BakerySwap.methods
        .getAmountsOut(firstSwap[1], [tokensBSC.WBNB, tokensBSC.DAI])
        .call();

      const thirdSwap = await BakerySwap.methods
        .getAmountsOut(initAmount, [tokensBSC.DAI, tokensBSC.WBNB])
        .call();

      const fourthSwap = await PancakeSwap.methods
        .getAmountsOut(thirdSwap[1], [tokensBSC.WBNB, tokensBSC.DAI])
        .call();

      console.log(initAmount, firstSwap, secondSwap, thirdSwap, fourthSwap);
      console.log(
        `PancakeSwap -> BakerySwap. Dai input / output: ${web3.utils.fromWei(
          initAmount.toString()
        )} / ${web3.utils.fromWei(secondSwap[1].toString())}`
      );
      console.log(
        `BakerySwap -> PancakeSwap. Dai input / output: ${web3.utils.fromWei(
          initAmount.toString()
        )} / ${web3.utils.fromWei(fourthSwap[1].toString())}`
      );

      const BTP = web3.utils.toBN(secondSwap[1]);
      const PTB = web3.utils.toBN(fourthSwap[1]);

      // Analyze arbitrage opportunities
      if (BTP.gt(initAmount)) {
        const gasPrice = await web3.eth.getGasPrice();
        //200000 is picked arbitrarily, have to be replaced by actual tx cost in next lectures, with Web3 estimateGas()
        const txCost = 200000 * parseInt(gasPrice);
        const profit = amountsOut2[1].sub(initAmount).sub(txCost);

        if (profit > 0) {
          console.log("Arb opportunity found Bakery -> Pancake!");
          console.log(
            `Expected profit: ${web3.utils.fromWei(profit.toString)} Dai`
          );
          handleArbitrage(DIRECTION.BAKERY_TO_PANCAKE, repayAmount, flashloan);
        }
      }

      if (PTB.gt(initAmount)) {
        const gasPrice = await web3.eth.getGasPrice();
        //200000 is picked arbitrarily, have to be replaced by actual tx cost in next lectures, with Web3 estimateGas()
        const txCost = 200000 * parseInt(gasPrice);
        const profit = amountsOut4[1].sub(initAmount).sub(txCost);

        if (profit > 0) {
          console.log("Arb opportunity found Pancake -> Bakery!");
          console.log(
            `Expected profit: ${web3.utils.fromWei(profit.toString())} Dai`
          );
          handleArbitrage(DIRECTION.PANCAKE_TO_BAKERY, repayAmount, flashloan);
        }
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
};

init();
