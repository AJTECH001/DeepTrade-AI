export const formatBalance = (balance: number): string => {
  return (balance / 1000000).toFixed(6); // Convert from micro USDC to USDC
};

export const formatPerformance = (performance: number): string => {
  const formatted = (performance / 1000000).toFixed(3);
  return performance >= 0 ? `+${formatted}` : formatted;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

export const formatWinRate = (winRate: number): string => {
  return `${winRate}%`;
};

export const formatTradeCount = (count: number): string => {
  return count.toString();
};