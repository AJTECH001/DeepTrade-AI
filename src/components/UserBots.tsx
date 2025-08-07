"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BotPerformance {
  botId: number;
  name: string;
  balance: number;
  performance: number;
  totalTrades: number;
  active: boolean;
  createdAt: number;
  winRate: number;
  profitLoss: number;
  balanceUSD: number;
  lastTradeAt: number | null;
}

async function fetchUserBots(_userAddress: string): Promise<BotPerformance[]> {
  // For demo purposes, we'll return mock data
  // In a real implementation, you would fetch from the API
  return [
    {
      botId: 1,
      name: "CryptoWizard",
      balance: 1000000,
      performance: 187000,
      totalTrades: 45,
      active: true,
      createdAt: Date.now() / 1000 - 86400,
      winRate: 78,
      profitLoss: 0.187,
      balanceUSD: 1.187,
      lastTradeAt: Date.now() / 1000 - 3600
    },
    {
      botId: 2,
      name: "MoonShot",
      balance: 800000,
      performance: 142000,
      totalTrades: 32,
      active: true,
      createdAt: Date.now() / 1000 - 172800,
      winRate: 72,
      profitLoss: 0.142,
      balanceUSD: 0.942,
      lastTradeAt: Date.now() / 1000 - 7200
    }
  ];
}

export function UserBots() {
  const { account } = useWallet();

  // Convert AccountAddress to string
  const userAddress = account?.address?.toString() || "";

  const { data: userBots, isLoading, error } = useQuery({
    queryKey: ["userBots", userAddress],
    queryFn: () => fetchUserBots(userAddress),
    enabled: !!userAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (!account?.address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Trading Bots</CardTitle>
          <CardDescription>
            Connect your wallet to view your trading bots.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Trading Bots</CardTitle>
          <CardDescription>Loading your bots...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Trading Bots</CardTitle>
          <CardDescription>Error loading your bots.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load trading bots. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!userBots || userBots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Trading Bots</CardTitle>
          <CardDescription>You haven't created any trading bots yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create your first trading bot to get started with automated trading.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Trading Bots</CardTitle>
        <CardDescription>
          Manage your AI-powered trading bots and monitor their performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userBots.map((bot) => (
            <div
              key={bot.botId}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{bot.name}</h3>
                  <Badge variant={bot.active ? "default" : "secondary"}>
                    {bot.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Balance</p>
                    <p className="font-medium">${bot.balanceUSD.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">P&L</p>
                    <p className={`font-medium ${bot.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {bot.profitLoss >= 0 ? '+' : ''}{bot.profitLoss.toFixed(3)} USDC
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Trades</p>
                    <p className="font-medium">{bot.totalTrades}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Win Rate</p>
                    <p className="font-medium">{bot.winRate}%</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  {bot.active ? "Pause" : "Resume"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}