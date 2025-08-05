"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatAddress } from "@/utils/helpers";

interface LeaderboardEntry {
  rank: number;
  botId: number;
  name: string;
  owner: string;
  performance: number;
  totalTrades: number;
  winRate: number;
  profitLoss: number;
  lastUpdated: string;
}

async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await fetch('/api/bots/leaderboard');
  const result = await response.json();
  
  if (result.success) {
    return result.leaderboard;
  } else {
    throw new Error(result.error || 'Failed to fetch leaderboard');
  }
}

export function Leaderboard() {
  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trading Leaderboard</CardTitle>
          <CardDescription>Loading top performers...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg"></div>
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
          <CardTitle>Trading Leaderboard</CardTitle>
          <CardDescription>Error loading leaderboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load leaderboard. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trading Leaderboard</CardTitle>
          <CardDescription>No trading bots found.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Be the first to create a trading bot and claim the top spot!
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-black";
      case 2:
        return "bg-neutral-400 text-black";
      case 3:
        return "bg-amber-700 text-white";
      default:
        return "bg-neutral-700 text-white";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Leaderboard</CardTitle>
        <CardDescription>
          Top performing AI trading bots on the DeepTrade AI platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.botId}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${getRankColor(entry.rank)}`}>
                  {entry.rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{entry.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {entry.totalTrades} trades
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    by {formatAddress(entry.owner)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${entry.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.profitLoss >= 0 ? '+' : ''}{entry.profitLoss.toFixed(3)} USDC
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {entry.winRate}% win rate
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Updated {new Date(entry.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 