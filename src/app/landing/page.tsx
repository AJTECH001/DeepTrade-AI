"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#051419] text-white font-sans">

            {/* Navigation */}
            <nav className="  border-b border-neutral-700 sticky top-0 z-50">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-[#00d2cee6] text-2xl font-bold">DeepTrade AI</span>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600/30 transition-all duration-200">
                                        Dashboard
                                    </a>
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/30 transition-all duration-200">
                                        Create Bot
                                    </a>
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/30 transition-all duration-200">
                                        Leaderboard
                                    </a>
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/30 transition-all duration-200">
                                        Cross-Chain
                                    </a>
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-blue-600/30 transition-all duration-200">
                                        Analytics
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Button
                                    onClick={() => router.push('/dashboard')}
                                    className="mr-3 bg-[#00d2cee6] hover:bg-[#00d2cee6] px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
                                >
                                    Connect Wallet
                                </Button>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <Button variant="ghost" size="sm">
                                <span className="sr-only">Menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="s mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
               
                <HeroSection />

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-[#051419] border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">Total Bots</h3>
                                <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold mt-2 text-white">143</p>
                            <div className="flex items-center mt-2 text-green-500 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span>+12.3% this week</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#051419] border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">Total Volume</h3>
                                <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold mt-2 text-white">$1.2M</p>
                            <div className="flex items-center mt-2 text-green-500 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span>+8.7% this week</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="Active Trades bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">Active Trades</h3>
                                <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold mt-2 text-white">87</p>
                            <div className="flex items-center mt-2 text-neutral-400 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                                </svg>
                                <span>+2.1% this week</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">Avg. Profit</h3>
                                <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold mt-2 text-green-500">+5.2%</p>
                            <div className="flex items-center mt-2 text-red-500 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                                <span>-1.3% this week</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Features Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Natural Language Strategy</h3>
                                <p className="text-neutral-400">
                                    Create complex trading strategies using plain English. Our AI converts your words into executable trading logic.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Gas-Free Trading</h3>
                                <p className="text-neutral-400">
                                    Execute trades with zero gas fees. We use Aptos Gas Station to sponsor all your transactions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Cross-Chain USDC</h3>
                                <p className="text-neutral-400">
                                    Seamlessly bridge USDC across multiple chains using Circle's CCTP protocol for cross-chain trading.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Trading Competitions</h3>
                                <p className="text-neutral-400">
                                    Compete in real-time trading contests and earn rewards based on your bot's performance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Risk Management</h3>
                                <p className="text-neutral-400">
                                    Configure advanced risk parameters like stop-loss, take-profit, and position sizing for each bot.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#051419]  border border-neutral-700 transform hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#00d2cee6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium mb-2">Performance Analytics</h3>
                                <p className="text-neutral-400">
                                    Track your bot's performance with detailed metrics, trade history, and profitability analysis.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-[#051419]  border border-neutral-700 rounded-2xl p-8 relative overflow-hidden mb-12">
                    <div className="relative z-10 md:flex items-center justify-between">
                        <div className="md:w-7/12 mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>
                            <p className="text-neutral-300 mb-6">
                                Join the DeepTrade AI platform today and create your first AI-powered trading bot in minutes. No coding required.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={() => router.push('/dashboard')}
                                    className="bg-[#00d2cee6] hover:bg-[#00d2cee6] px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                                >
                                    Get Started Now
                                </Button>
                                <Button variant="outline" className="bg-neutral-700 hover:bg-neutral-600 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-4/12">
                            <div className="grid grid-cols-2 gap-4">
                                <div className=" border border-neutral-700 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200">
                                    <p className="text-xl font-bold text-[#00d2cee6]">0%</p>
                                    <p className="text-sm text-neutral-400">Gas Fees</p>
                                </div>
                                <div className=" border border-neutral-700 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200">
                                    <p className="text-xl font-bold text-[#00d2cee6]">24/7</p>
                                    <p className="text-sm text-neutral-400">Automated Trading</p>
                                </div>
                                <div className=" border border-neutral-700 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200">
                                    <p className="text-xl font-bold text-[#00d2cee6]">100%</p>
                                    <p className="text-sm text-neutral-400">On-Chain</p>
                                </div>
                                <div className=" border border-neutral-700 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200">
                                    <p className="text-xl font-bold text-[#00d2cee6]">$5K</p>
                                    <p className="text-sm text-neutral-400">Weekly Prizes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className=" border-t border-neutral-800 py-12">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-[#00d2cee6] text-xl font-bold mb-4">DeepTrade AI</h3>
                            <p className="text-neutral-400 mb-4">
                                AI-powered trading bot platform on the Aptos blockchain. Create, deploy, and compete with automated trading strategies.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium mb-4">Platform</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Dashboard</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Create Bot</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Leaderboard</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Analytics</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Cross-Chain</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Documentation</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">API Reference</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Tutorials</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium mb-4">Community</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Discord</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Twitter</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Blog</a></li>
                                <li><a href="#" className="text-neutral-400 hover:text-white transition-all duration-200">Events</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 