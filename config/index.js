const testnodes = {
  bsc: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/bsc/testnet/ws",
  eth: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/eth/rinkeby/ws", //rinkeby
  avax: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/avalanche/testnet/ws",
};

const livenodes = {
  bsc: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/bsc/mainnet/ws",
  eth: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/eth/mainnet/ws",
  avax: "wss://speedy-nodes-nyc.moralis.io/6850342b04f16024d7d9a64d/avalanche/mainnet/ws",
};

const tokensBSC = {
  DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
};

const routerBSC = {
  bakerySwap: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F",
  pancakeSwap: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
};

const routerETH = {
  sushiSwap: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  uniSwap: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", 
}

const factoryBSC = {
  pancakeSwap: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
};

const tokensETH = {
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
};

export { testnodes, livenodes, tokensBSC, routerBSC, factoryBSC, tokensETH };