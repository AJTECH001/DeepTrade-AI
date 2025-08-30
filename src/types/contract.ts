// Trading bot related enums
export enum BotStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSED = 'paused'
}

export enum TradeType {
  BUY = 0,
  SELL = 1
}

export enum ContractFunction {
  CREATE_BOT = 'create_bot',
  EXECUTE_TRADE = 'execute_trade',
  GET_BOT = 'get_bot',
  GET_LEADERBOARD = 'get_leaderboard',
  GET_REGISTRY_STATS = 'get_registry_stats',
  HAS_BOT = 'has_bot'
}

// Contract interaction types
export interface TradingBotData {
  owner: string;
  bot_id: number;
  name: string;
  strategy: string;
  balance: number;
  performance: number;
  total_loss: number;
  active: boolean;
  total_trades: number;
  created_at: number;
  last_trade_at?: number;
}

export interface BotPerformanceData {
  bot_id: number;
  owner: string;
  name: string;
  net_performance: number;
  total_trades: number;
  win_rate: number;
}

export interface RegistryStats {
  total_bots: number;
  total_volume: number;
}

export interface CreateBotParams {
  name: string;
  strategy: string;
  initial_balance: number;
  max_position_size: number;
  stop_loss_percent: number;
  max_trades_per_day: number;
  max_daily_loss: number;
}

export interface ContractResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}