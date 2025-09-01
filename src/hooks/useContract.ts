import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { contractService } from "@/services/contractService";
import { CreateBotParams } from "@/types/contract";
import { useToast } from "@/components/ui/use-toast";

export function useUserBot(userAddress?: string) {
  return useQuery({
    queryKey: ["userBot", userAddress],
    queryFn: async () => {
      const result = await contractService.getUserBot(userAddress!);
      console.log("User bot query result:", result);
      return result;
    },
    enabled: !!userAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
    select: (data) => data.success ? data.data : undefined,
    retry: (failureCount, error) => {
      // Don't retry if it's a "no bot found" error
      const errorMessage = error instanceof Error ? error.message : "";
      if (errorMessage.includes("No bot found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const result = await contractService.getLeaderboard();
      console.log("Leaderboard query result:", result);
      return result;
    },
    refetchInterval: 30000,
    select: (data) => data.success ? data.data : [],
    retry: 3,
  });
}

export function useRegistryStats() {
  return useQuery({
    queryKey: ["registryStats"],
    queryFn: () => contractService.getRegistryStats(),
    refetchInterval: 60000, // Refetch every minute
    select: (data) => data.success ? data.data : undefined,
  });
}

export function useHasBot(userAddress?: string) {
  return useQuery({
    queryKey: ["hasBot", userAddress],
    queryFn: () => contractService.hasBot(userAddress!),
    enabled: !!userAddress,
    select: (data) => data.success ? data.data : false,
  });
}

export function useCreateBot() {
  const { signAndSubmitTransaction, account } = useWallet();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (params: CreateBotParams) => {
      if (!signAndSubmitTransaction) {
        throw new Error("Wallet not connected");
      }
      if (!account?.address) {
        throw new Error("No wallet address available");
      }
      
      console.log("Creating bot with params:", params);
      console.log("Wallet address:", account.address);
      
      const result = await contractService.createBot(params, signAndSubmitTransaction);
      console.log("Contract service result:", result);
      return result;
    },
    onSuccess: (data, variables) => {
      console.log("Mutation onSuccess called with data:", data);
      console.log("Variables:", variables);
      
      // Always show success toast if we reach this point
      console.log("Showing success toast...");
      toast({
        title: "Bot created successfully! 🎉",
        description: `${variables.name} has been created and is ready to trade.`,
      });
      
      // Invalidate relevant queries with specific user address
      const userAddress = account?.address?.toString();
      console.log("Invalidating queries for user:", userAddress);
      
      queryClient.invalidateQueries({ queryKey: ["userBot", userAddress] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["registryStats"] });
      queryClient.invalidateQueries({ queryKey: ["hasBot", userAddress] });
      
      // Force refetch after a short delay to ensure contract state is updated
      console.log("Setting up delayed refetch...");
      setTimeout(() => {
        console.log("Executing delayed refetch...");
        queryClient.refetchQueries({ queryKey: ["userBot", userAddress] });
        queryClient.refetchQueries({ queryKey: ["leaderboard"] });
        queryClient.refetchQueries({ queryKey: ["hasBot", userAddress] });
      }, 3000); // Increased delay to 3 seconds
      
      // Check if the response indicates failure and handle it
      if (data && !data.success) {
        console.log("Data indicates failure, throwing error:", data.error);
        throw new Error(data.error || "Failed to create bot");
      }
    },
    onError: (error) => {
      console.error("Create bot mutation error:", error);
      
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      const isInsufficientGas = errorMessage.includes("Not enough APT") || errorMessage.includes("gas fee");
      const isBotAlreadyExists = errorMessage.includes("Failed to move resource") || errorMessage.includes("MoveTo");
      
      if (isInsufficientGas) {
        toast({
          title: "Insufficient APT for gas fees",
          description: "You need APT tokens to pay for transaction gas fees. Get free testnet APT from the faucet.",
          variant: "destructive",
        });
      } else if (isBotAlreadyExists) {
        toast({
          title: "Bot already exists",
          description: "You already have a trading bot. Each user can only create one bot at a time.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to create bot",
          description: errorMessage,
          variant: "destructive",
        });
      }
    },
  });
}