// Module: trading_bot_addr::trading_bot
// Description: A decentralized trading bot management system on the Aptos blockchain.
// This module allows users to create, manage, and execute trades with automated trading bots,
// with features like risk management, performance tracking, and a global leaderboard.
module trading_bot_addr::trading_bot {
    // Importing standard Move libraries for common functionality
    use std::string::{Self, String}; // String manipulation utilities
    use std::vector; // Dynamic array operations
    use std::signer; // Signer type for authentication
    use aptos_std::timestamp; // Timestamp utilities for time-based operations
    
    // Importing Aptos framework modules for core blockchain functionality
    use aptos_framework::event::{Self, EventHandle}; // Event emission and handling
    use aptos_framework::account; // Account management utilities

    // ======================== Error Codes ========================
    // Error codes for specific failure cases to provide clear error handling
    /// Bot not found at the specified address
    const EBOT_NOT_FOUND: u64 = 1;
    /// Insufficient balance for bot creation or trade execution
    const EINSUFFICIENT_BALANCE: u64 = 2;
    /// Attempt to interact with an inactive bot
    const EBOT_NOT_ACTIVE: u64 = 3;
    /// Unauthorized access to a bot (e.g., non-owner attempting to execute a trade)
    const EUNAUTHORIZED: u64 = 4;
    /// Invalid parameters provided for bot creation or trade execution
    const EINVALID_TRADE_PARAMS: u64 = 5;
    /// Trade exceeds configured risk limits
    const ERISK_LIMIT_EXCEEDED: u64 = 6;

    // ======================== Constants ========================
    // Constants defining operational limits for the trading bot system
    /// Maximum number of bots a single user can create
    const MAX_BOTS_PER_USER: u64 = 10;
    /// Minimum balance required to create a bot (1 USDC, assuming 6 decimals)
    const MIN_BOT_BALANCE: u64 = 1000000; // 1 USDC (1e6 micro USDC)
    /// Maximum number of trades a bot can execute in a 24-hour period
    const MAX_DAILY_TRADES: u8 = 50;
    /// Maximum position size as a percentage of the bot's balance (20%)
    const MAX_POSITION_SIZE_PERCENT: u8 = 20;
    /// Seconds in a day
    const SECONDS_PER_DAY: u64 = 86400;

    // ======================== Data Structures ========================
    
    /// Represents a trading bot with its configuration and state
    /// Stored as a resource in the blockchain, with `key` (addressable) and `store` (storable) abilities
    struct TradingBot has key, store {
        owner: address, // Address of the bot's owner
        bot_id: u64, // Unique identifier for the bot
        name: String, // Human-readable name of the bot
        strategy: String, // Trading strategy description (e.g., "mean_reversion")
        balance: u64, // Current balance in micro USDC
        performance: u64, // Total profit in micro USDC
        total_loss: u64, // Total loss in micro USDC (tracked separately)
        active: bool, // Whether the bot is active and can execute trades
        created_at: u64, // Timestamp of bot creation (in seconds)
        last_trade_at: u64, // Timestamp of the last trade executed
        total_trades: u64, // Total number of trades executed by the bot
        daily_trades: u8, // Number of trades executed in the current 24-hour period
        daily_trades_reset_at: u64, // Timestamp when daily trade count resets
        risk_settings: RiskSettings, // Risk management configuration
        trade_history: vector<TradeRecord>, // History of all trades executed
    }

    /// Risk management settings for a trading bot
    /// Configurable parameters to limit risk exposure
    /// `store`, `copy`, and `drop` abilities allow flexible handling
    struct RiskSettings has store, copy, drop {
        max_position_size: u64, // Maximum size of a single trade (in micro USDC)
        stop_loss_percent: u8, // Maximum loss percentage for a trade (0-100)
        max_trades_per_day: u8, // Maximum trades allowed per day
        max_daily_loss: u64, // Maximum daily loss in micro USDC
    }

    /// Record of a completed trade
    /// Stores details of each trade for history and performance tracking
    /// `store`, `copy`, and `drop` abilities for flexible handling
    struct TradeRecord has store, copy, drop {
        timestamp: u64, // Time the trade was executed
        trade_type: u8, // 0 for buy, 1 for sell
        amount: u64, // Trade amount in micro USDC
        price: u64, // Price at which the trade was executed
        profit: u64, // Profit from the trade
        loss: u64, // Loss from the trade
    }

    /// Bot performance data for the global leaderboard
    /// Summarizes key metrics for ranking bots
    struct BotPerformance has store, copy, drop {
        bot_id: u64, // Unique bot identifier
        owner: address, // Bot owner's address
        name: String, // Bot name
        net_performance: u64, // Net performance (profit - loss) in micro USDC
        total_trades: u64, // Total trades executed
        win_rate: u64, // Percentage of profitable trades (0-100)
    }

    /// Global registry for tracking all trading bots
    /// Stored as a resource with `key` ability for global access
    struct TradingBotRegistry has key {
        total_bots: u64, // Total number of bots created
        total_volume: u64, // Cumulative trading volume across all bots
        leaderboard: vector<BotPerformance>, // List of bot performance metrics
        bot_creators: vector<address>, // List of addresses that created bots
    }

    /// Event structures for emitting blockchain events
    /// Events are used to log significant actions for transparency
    struct BotCreatedEvent has drop, store {
        bot_id: u64, // ID of the created bot
        owner: address, // Address of the bot's owner
        name: String, // Name of the bot
        initial_balance: u64, // Initial balance in micro USDC
    }

    struct TradeExecutedEvent has drop, store {
        bot_id: u64, // ID of the bot executing the trade
        trade_type: u8, // 0 for buy, 1 for sell
        amount: u64, // Trade amount
        price: u64, // Trade price
        profit: u64, // Profit from the trade
        loss: u64, // Loss from the trade
    }

    struct BotPerformanceUpdatedEvent has drop, store {
        bot_id: u64, // ID of the bot
        new_performance: u64, // Updated net performance
        total_trades: u64, // Updated total trade count
    }

    /// Stores event handles for emitting bot-related events
    /// Stored as a resource with `key` ability
    struct TradingBotEvents has key {
        bot_created_events: EventHandle<BotCreatedEvent>, // Handle for bot creation events
        trade_executed_events: EventHandle<TradeExecutedEvent>, // Handle for trade execution events
        performance_updated_events: EventHandle<BotPerformanceUpdatedEvent>, // Handle for performance updates
    }

    // ======================== Module Initialization ========================
    
    /// Initializes the module by creating global storage resources
    /// Called once when the module is deployed
    fun init_module(sender: &signer) {
        // Initialize the global registry to track all bots
        move_to(sender, TradingBotRegistry {
            total_bots: 0, // No bots created yet
            total_volume: 0, // No trading volume yet
            leaderboard: vector::empty(), // Empty leaderboard
            bot_creators: vector::empty(), // No creators yet
        });

        // Initialize event handles for emitting events
        move_to(sender, TradingBotEvents {
            bot_created_events: account::new_event_handle<BotCreatedEvent>(sender),
            trade_executed_events: account::new_event_handle<TradeExecutedEvent>(sender),
            performance_updated_events: account::new_event_handle<BotPerformanceUpdatedEvent>(sender),
        });
    }

    // ======================== Bot Management Functions ========================

/// Creates a new trading bot with specified parameters
/// Only the signer (owner) can create a bot
/// Acquires global registry and events for updates
public entry fun create_bot(
    sender: &signer,
    name: String, // Bot name
    strategy: String, // Trading strategy
    initial_balance: u64, // Initial bot balance
    max_position_size: u64, // Max trade size
    stop_loss_percent: u8, // Stop loss percentage
    max_trades_per_day: u8, // Max daily trades
    max_daily_loss: u64, // Max daily loss limit
) acquires TradingBotRegistry, TradingBotEvents {
    let sender_addr = signer::address_of(sender); // Get the caller's address
    
    // Validate input parameters to ensure correctness
    assert!(string::length(&name) > 0, EINVALID_TRADE_PARAMS); // Name must not be empty
    assert!(string::length(&strategy) > 0, EINVALID_TRADE_PARAMS); // Strategy must not be empty
    assert!(initial_balance >= MIN_BOT_BALANCE, EINSUFFICIENT_BALANCE); // Ensure minimum balance
    assert!(stop_loss_percent <= 100, EINVALID_TRADE_PARAMS); // Stop loss must be 0-100%
    assert!(max_trades_per_day <= MAX_DAILY_TRADES, EINVALID_TRADE_PARAMS); // Respect max daily trades limit

    // Access the global registry to assign a new bot ID
    let registry = borrow_global_mut<TradingBotRegistry>(@trading_bot_addr);
    let bot_id = registry.total_bots + 1; // Incremental bot ID

    // Store the name before creating the bot (since we need it for the event after moving)
    let bot_name_copy = name;

    // Create a new bot with the provided configuration
    let bot = TradingBot {
        owner: sender_addr,
        bot_id,
        name,
        strategy,
        balance: initial_balance,
        performance: 0, // Initial profit is zero
        total_loss: 0, // Initial loss is zero
        active: true, // Bot starts active
        created_at: timestamp::now_seconds(), // Current timestamp
        last_trade_at: 0, // No trades yet
        total_trades: 0, // No trades executed
        daily_trades: 0, // No daily trades yet
        daily_trades_reset_at: timestamp::now_seconds(), // Set reset time
        risk_settings: RiskSettings {
            max_position_size,
            stop_loss_percent,
            max_trades_per_day,
            max_daily_loss,
        },
        trade_history: vector::empty(), // Empty trade history
    };

    // Store the bot at the sender's address
    move_to(sender, bot);

    // Update the global registry
    registry.total_bots = bot_id; // Increment total bots
    vector::push_back(&mut registry.bot_creators, sender_addr); // Record creator

    // Emit a bot creation event for transparency (using the copied name)
    let events = borrow_global_mut<TradingBotEvents>(@trading_bot_addr);
    event::emit_event(&mut events.bot_created_events, BotCreatedEvent {
        bot_id,
        owner: sender_addr,
        name: bot_name_copy, // Use the copied name instead of bot.name
        initial_balance,
    });
}

    /// Executes a trade for a specified bot
    /// Only the bot owner can execute trades
    /// Validates risk limits and updates bot state
    public entry fun execute_trade(
        sender: &signer,
        trade_type: u8, // 0 for buy, 1 for sell
        amount: u64, // Trade amount
        price: u64, // Trade price
    ) acquires TradingBot, TradingBotRegistry, TradingBotEvents {
        let sender_addr = signer::address_of(sender); // Get the caller's address
        
        // Validate trade parameters
        assert!(trade_type <= 1, EINVALID_TRADE_PARAMS); // Trade type must be buy (0) or sell (1)
        assert!(amount > 0, EINVALID_TRADE_PARAMS); // Amount must be positive
        assert!(price > 0, EINVALID_TRADE_PARAMS); // Price must be positive

        // Access the bot's state at the sender's address
        assert!(exists<TradingBot>(sender_addr), EBOT_NOT_FOUND);
        let bot = borrow_global_mut<TradingBot>(sender_addr);
        
        // Verify bot status
        assert!(bot.active, EBOT_NOT_ACTIVE); // Bot must be active

        // Check and reset daily trade counter if 24 hours have passed
        let current_time = timestamp::now_seconds();
        if ((current_time - bot.daily_trades_reset_at) >= SECONDS_PER_DAY) {
            bot.daily_trades = 0; // Reset daily trade count
            bot.daily_trades_reset_at = current_time; // Update reset time
        };
        
        // Enforce risk limits
        assert!(bot.daily_trades < bot.risk_settings.max_trades_per_day, ERISK_LIMIT_EXCEEDED); // Check daily trade limit
        assert!(amount <= bot.risk_settings.max_position_size, ERISK_LIMIT_EXCEEDED); // Check position size limit

        // Calculate profit/loss (simplified logic for demonstration)
        // In a real implementation, this would depend on actual market data
        let (profit, loss) = if (trade_type == 0) { // Buy
            (0, amount / 100) // Small loss for buys (transaction cost simulation)
        } else { // Sell
            (amount / 50, 0) // Small profit for sells (revenue simulation)
        };

        // Update bot state
        bot.balance = bot.balance + amount; // Update balance (simplified)
        bot.performance = bot.performance + profit; // Update profit
        bot.total_loss = bot.total_loss + loss; // Update loss
        bot.last_trade_at = current_time; // Record trade time
        bot.total_trades = bot.total_trades + 1; // Increment total trades
        bot.daily_trades = bot.daily_trades + 1; // Increment daily trades

        // Record the trade in history
        let trade_record = TradeRecord {
            timestamp: current_time,
            trade_type,
            amount,
            price,
            profit,
            loss,
        };
        vector::push_back(&mut bot.trade_history, trade_record);

        // Update global trading volume in the registry
        let registry = borrow_global_mut<TradingBotRegistry>(@trading_bot_addr);
        registry.total_volume = registry.total_volume + amount;

        // Calculate net performance for event
        let net_performance = if (bot.performance >= bot.total_loss) {
            bot.performance - bot.total_loss
        } else {
            0
        };

        // Emit trade execution event
        let events = borrow_global_mut<TradingBotEvents>(@trading_bot_addr);
        event::emit_event(&mut events.trade_executed_events, TradeExecutedEvent {
            bot_id: bot.bot_id,
            trade_type,
            amount,
            price,
            profit,
            loss,
        });

        // Update the leaderboard with the new performance
        update_leaderboard(bot.bot_id, bot.owner, bot.name, net_performance, bot.total_trades);
    }

    /// Updates the global leaderboard with a bot's performance
    /// Called after each trade to keep the leaderboard current
    fun update_leaderboard(
        bot_id: u64,
        owner: address,
        name: String,
        net_performance: u64,
        total_trades: u64,
    ) acquires TradingBotRegistry, TradingBotEvents {
        let registry = borrow_global_mut<TradingBotRegistry>(@trading_bot_addr);
        
        // Calculate win rate (simplified: based on performance vs. trades)
        let win_rate = if (total_trades > 0) {
            (net_performance * 100) / total_trades // Percentage calculation
        } else {
            0 // No trades, so win rate is 0
        };

        // Create a performance record for the leaderboard
        let bot_performance = BotPerformance {
            bot_id,
            owner,
            name,
            net_performance,
            total_trades,
            win_rate,
        };

        // Update or add to the leaderboard
        let leaderboard = &mut registry.leaderboard;
        let i = 0;
        let len = vector::length(leaderboard);
        let found = false;
        
        // Check if the bot is already in the leaderboard
        while (i < len) {
            let existing = vector::borrow(leaderboard, i);
            if (existing.bot_id == bot_id) {
                // Update existing entry
                *vector::borrow_mut(leaderboard, i) = bot_performance;
                found = true;
                break
            };
            i = i + 1;
        };

        // If not found, add a new entry to the leaderboard
        if (!found) {
            vector::push_back(leaderboard, bot_performance);
        };

        // Emit performance update event
        let events = borrow_global_mut<TradingBotEvents>(@trading_bot_addr);
        event::emit_event(&mut events.performance_updated_events, BotPerformanceUpdatedEvent {
            bot_id,
            new_performance: net_performance,
            total_trades,
        });
    }

    // ======================== View Functions ========================

    #[view]
    /// Retrieves core information about a bot
    /// View function for querying bot state without modification
    public fun get_bot(bot_owner: address): (address, String, String, u64, u64, u64, bool, u64, u64) acquires TradingBot {
        let bot = borrow_global<TradingBot>(bot_owner); // Access bot state
        (
            bot.owner,
            bot.name,
            bot.strategy,
            bot.balance,
            bot.performance,
            bot.total_loss,
            bot.active,
            bot.total_trades,
            bot.created_at,
        )
    }

    #[view]
    /// Retrieves a bot's risk settings
    public fun get_bot_risk_settings(bot_owner: address): (u64, u8, u8, u64) acquires TradingBot {
        let bot = borrow_global<TradingBot>(bot_owner); // Access bot state
        let settings = &bot.risk_settings;
        (
            settings.max_position_size,
            settings.stop_loss_percent,
            settings.max_trades_per_day,
            settings.max_daily_loss
        )
    }

    #[view]
    /// Retrieves the global leaderboard
    public fun get_leaderboard(): vector<BotPerformance> acquires TradingBotRegistry {
        let registry = borrow_global<TradingBotRegistry>(@trading_bot_addr);
        registry.leaderboard // Return the leaderboard
    }

    #[view]
    /// Retrieves global registry statistics
    public fun get_registry_stats(): (u64, u64) acquires TradingBotRegistry {
        let registry = borrow_global<TradingBotRegistry>(@trading_bot_addr);
        (registry.total_bots, registry.total_volume) // Return total bots and volume
    }

    #[view]
    /// Check if a user has a bot
    public fun has_bot(user_addr: address): bool {
        exists<TradingBot>(user_addr)
    }

    // ======================== Test Functions ========================

    #[test_only]
    /// Initializes the module for testing purposes
    public fun init_module_for_test(sender: &signer) {
        init_module(sender); // Call the main initialization function
    }

    #[test_only]
    /// Creates a test bot with default risk settings
    public fun create_test_bot(
        sender: &signer,
        name: String,
        strategy: String,
        initial_balance: u64,
    ) acquires TradingBotRegistry, TradingBotEvents {
        // Create a bot with default risk settings for testing
        create_bot(sender, name, strategy, initial_balance, 1000000, 10, 20, 500000);
    }
}