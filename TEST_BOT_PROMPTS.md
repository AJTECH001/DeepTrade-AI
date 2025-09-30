# 🤖 Accurate Bot Creation Test Prompts

## ✅ **Perfect Test Prompts for Your DeepTrade AI**

These prompts are designed to work with your real OpenAI integration and create functional trading bots:

### 📈 **RSI-Based Strategies (Recommended)**

#### **Conservative RSI Bot**
```
Buy APT when RSI drops below 30 and sell when RSI goes above 70 with 5% stop loss
```
**Expected Result:**
- Symbol: APT/USDC
- Buy condition: RSI < 30
- Sell condition: RSI > 70
- Stop loss: 5%
- Risk management: Conservative settings

#### **Aggressive RSI Bot**
```
Buy when RSI is oversold below 25, sell when RSI reaches 75, use 10% of balance per trade
```
**Expected Result:**
- More aggressive entry/exit points
- Higher position sizing
- Faster trading frequency

### 📊 **Multi-Indicator Strategies**

#### **RSI + Price Drop Combo**
```
Buy APT when RSI is below 35 AND price drops more than 3% in 1 hour, sell when RSI exceeds 65
```
**Expected Result:**
- Multiple conditions (RSI + price change)
- Time-based price analysis
- Compound trading logic

#### **Moving Average + RSI**
```
Buy when price is above 20-period moving average and RSI is below 40, sell when RSI goes above 60
```
**Expected Result:**
- Technical analysis combination
- Trend following with momentum

### 🎯 **Simple Test Bots (Good for First Test)**

#### **Basic Price Drop Bot**
```
Buy APT when price falls 5% and sell when it rises 8%
```
**Expected Result:**
- Simple price-based conditions
- Clear profit target
- Easy to understand logic

#### **Volume Spike Bot**
```
Buy when volume increases by 50% and price is rising, sell after 2% profit
```
**Expected Result:**
- Volume-based entry
- Quick profit taking

### ⚡ **Advanced Strategies**

#### **MACD + RSI Combination**
```
Buy when MACD crosses above signal line and RSI is below 50, sell when MACD crosses below signal line or RSI exceeds 70
```
**Expected Result:**
- Complex technical analysis
- Multiple exit conditions
- Professional trading strategy

#### **Bollinger Bands Strategy**
```
Buy when price touches lower Bollinger Band and RSI is oversold, sell when price reaches upper Bollinger Band
```
**Expected Result:**
- Mean reversion strategy
- Statistical price boundaries
- Advanced technical indicators

---

## 🧪 **How to Test Bot Creation**

### **Step 1: Use the Bot Creator UI**
1. Go to your dashboard
2. Click "Create New Bot"
3. Enter one of the prompts above
4. Set your risk preferences

### **Step 2: Watch for OpenAI Processing**
```
✅ OpenAI API Key found
🧠 Testing strategy parsing...
✅ Strategy parsed successfully:
   Symbol: APT/USDC
   Timeframe: 5m
   Conditions: 2
     1. rsi < 30
     2. price_change < -5
   Buy actions: 1
   Sell actions: 1
```

### **Step 3: Verify Bot Configuration**
- Check the parsed conditions match your intent
- Verify risk management settings
- Confirm the bot is marked as "ACTIVE"

### **Step 4: Test Real Market Monitoring**
```
📊 Market Data Sources: Binance WebSocket, CoinMarketCap API
💰 Current APT Price: $12.45
📈 RSI: 45.2
🎯 Bot monitoring: 1 active condition
```

---

## 🎯 **Recommended First Test**

Start with this **simple, reliable prompt**:

```
Buy APT when RSI drops below 30, sell when RSI goes above 70
```

**Why this works best:**
- ✅ Single, clear indicator (RSI)
- ✅ Well-defined entry/exit points
- ✅ Conservative approach
- ✅ Easy to verify with real market data
- ✅ OpenAI understands this pattern perfectly

---

## 🔍 **What to Watch For**

### **Successful Bot Creation:**
```
✅ Strategy parsed successfully
✅ Bot created: bot-id-12345
✅ Risk settings applied
✅ Market data connection established
✅ Bot status: ACTIVE
```

### **Real-Time Monitoring:**
```
📊 APT/USDC: $12.45 (+2.3%)
📈 RSI: 45.2 (Neutral)
🎯 Conditions: 0/1 met
⏰ Next check: 3 seconds
```

### **When Conditions Are Met:**
```
🚨 Trade Signal Generated!
   Bot: rsi-bot-001
   Action: BUY
   Amount: $100
   Price: $12.30
   Reason: RSI (29.8) < 30
   Confidence: 85%
```

---

## 🎉 **Expected Real Behavior**

1. **OpenAI parses your English** → Structured trading rules
2. **Binance provides real prices** → Live APT/USDC data
3. **Technical indicators calculated** → Real RSI values
4. **Bot monitors 24/7** → Checks every 5 seconds
5. **Auto-executes trades** → Real Aptos blockchain transactions

Your bot will actually trade based on real market conditions! 🚀