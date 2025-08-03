import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🏪 POS System - Professional Point of Sale">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-7xl px-6 text-sm">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-7xl flex-col lg:flex-row items-center justify-center gap-12 px-6">
                        {/* Left side - Hero content */}
                        <div className="flex-1 max-w-2xl">
                            <div className="text-center lg:text-left">
                                <h1 className="mb-6 text-4xl lg:text-6xl font-bold leading-tight">
                                    🏪 Professional<br />
                                    <span className="text-blue-600">Point of Sale</span>
                                </h1>
                                
                                <p className="mb-8 text-lg lg:text-xl text-[#706f6c] dark:text-[#A1A09A] leading-relaxed">
                                    Complete offline POS system with multi-UOM support, inventory management, 
                                    and real-time transaction processing. Perfect for retail businesses of any size.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg dark:bg-[#161615]/50">
                                        <span className="text-2xl">🔍</span>
                                        <div>
                                            <h3 className="font-semibold">Smart Search</h3>
                                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                Barcode scanning & live item search
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg dark:bg-[#161615]/50">
                                        <span className="text-2xl">📊</span>
                                        <div>
                                            <h3 className="font-semibold">Multi-UOM</h3>
                                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                Ecer, grosir, lusin pricing support
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg dark:bg-[#161615]/50">
                                        <span className="text-2xl">📦</span>
                                        <div>
                                            <h3 className="font-semibold">Inventory</h3>
                                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                Real-time stock tracking & management
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg dark:bg-[#161615]/50">
                                        <span className="text-2xl">💳</span>
                                        <div>
                                            <h3 className="font-semibold">Fast Checkout</h3>
                                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                                Quick transaction processing
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <a
                                        href="/"
                                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        🚀 Start Selling Now
                                    </a>
                                    <a
                                        href="/items"
                                        className="inline-flex items-center justify-center px-8 py-3 border border-[#19140035] text-[#1b1b18] font-semibold rounded-lg hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition-colors"
                                    >
                                        📦 Manage Inventory
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Preview */}
                        <div className="flex-1 max-w-lg">
                            <div className="bg-white rounded-xl shadow-2xl p-6 dark:bg-[#161615] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.1)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="ml-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">POS Terminal</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="p-3 bg-gray-50 rounded-lg dark:bg-[#0a0a0a]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">🥤 Coca Cola 330ml</span>
                                            <span className="font-semibold">Rp 3,500</span>
                                        </div>
                                        <div className="text-xs text-[#706f6c] dark:text-[#A1A09A] mt-1">
                                            ecer × 2
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-gray-50 rounded-lg dark:bg-[#0a0a0a]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">🍪 Oreo Original</span>
                                            <span className="font-semibold">Rp 78,000</span>
                                        </div>
                                        <div className="text-xs text-[#706f6c] dark:text-[#A1A09A] mt-1">
                                            grosir × 1
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 dark:border-[#3E3E3A] pt-3">
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-blue-600">Rp 85,500</span>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold">
                                        💳 Process Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <a href="/categories" className="hover:text-blue-600 transition-colors">📂 Categories</a>
                        <a href="/items" className="hover:text-blue-600 transition-colors">📦 Items</a>
                        <a href="/transactions" className="hover:text-blue-600 transition-colors">📊 Transactions</a>
                    </div>
                    Built with ❤️ by{" "}
                    <a 
                        href="https://app.build" 
                        target="_blank" 
                        className="font-medium text-[#f53003] hover:underline dark:text-[#FF4433]"
                    >
                        app.build
                    </a>
                </footer>
            </div>
        </>
    );
}