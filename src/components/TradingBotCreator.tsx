"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TradingBotCreator() {
  const { account } = useWallet();
  const { toast } = useToast();
  const [botName, setBotName] = useState("");
  const [strategy, setStrategy] = useState("");
  const [initialBalance, setInitialBalance] = useState(1000);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateBot = async () => {
    if (!account?.address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a trading bot.",
        variant: "destructive",
      });
      return;
    }

    if (!botName.trim() || !strategy.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both bot name and strategy.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      // Simulate bot creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Bot created successfully",
        description: `${botName} has been created and is ready to trade.`,
      });

      // Reset form
      setBotName("");
      setStrategy("");
      setInitialBalance(1000);
    } catch (error) {
      toast({
        title: "Failed to create bot",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Trading Bot</CardTitle>
        <CardDescription>
          Create an AI-powered trading bot using natural language strategy descriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="bot-name">Bot Name</Label>
          <Input
            id="bot-name"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter a name for your bot"
          />
        </div>

        <div>
          <Label htmlFor="strategy">Trading Strategy</Label>
          <textarea
            id="strategy"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[120px]"
            placeholder="Describe your trading strategy in natural language. For example: 'Buy when RSI is below 30 and sell when RSI is above 70. Use 5% stop loss and 10% take profit.'"
          />
        </div>

        <div>
          <Label htmlFor="initial-balance">Initial Balance (USDC)</Label>
          <Input
            id="initial-balance"
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)}
            min="1"
            step="1"
          />
        </div>

        <Button 
          onClick={handleCreateBot} 
          disabled={isCreating || !account?.address}
          className="w-full"
        >
          {isCreating ? "Creating Bot..." : "Create Trading Bot"}
        </Button>

        <div className="text-sm text-muted-foreground p-4 border rounded-lg bg-muted/50">
          <p className="font-semibold mb-2">How it works:</p>
          <ul className="space-y-1 text-xs">
            <li>• Describe your strategy in plain English</li>
            <li>• Our AI converts it to executable trading logic</li>
            <li>• Bot deploys on Aptos blockchain automatically</li>
            <li>• Monitor performance in real-time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}