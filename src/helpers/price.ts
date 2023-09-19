import BigNumber from './bignumber';

export function getPoolLiquidity(pool, prices) {
  let sumWeight = new BigNumber(0);
  let sumValue = new BigNumber(0);
  for (const token of pool.tokens) {
    const price = prices[token.checksum];
    if (!price) {
      continue;
    }
    const balanceNumber = new BigNumber(token.balance);
    const value = balanceNumber.times(price);

    console.log("lidiquidity value", token.balance);
    console.log("lidiquidity price", price);
    sumValue = sumValue.plus(value);
    sumWeight = sumWeight.plus(token.weightPercent / 100);
  }
  if (sumWeight.gt(0)) {
    console.log('sumWeight', sumWeight.toString());
    console.log("sumValue", sumValue.toString());
    return sumValue.div(sumWeight).toString();
  } else {
    return pool.liquidity;
  }
}
