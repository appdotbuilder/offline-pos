import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';

interface UOM {
    name: string;
    conversion_factor: number;
    sale_price: number;
}

interface Item {
    id: number;
    barcode: string;
    name: string;
    category: string;
    stock_quantity: number;
    smallest_unit: string;
    uoms: UOM[];
}

interface CartItem {
    item: Item;
    selectedUom: UOM;
    quantity: number;
    subtotal: number;
}

interface Transaction {
    id: number;
    transaction_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    items_count: number;
}

interface Props {
    recentTransactions: Transaction[];
    [key: string]: unknown;
}

export default function Pos({ recentTransactions }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paidAmount, setPaidAmount] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [lastTransaction, setLastTransaction] = useState<{
        id: number;
        transaction_number: string;
        total_amount: number;
        change_amount: number;
    } | null>(null);

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = parseFloat(discountAmount) || 0;
    const tax = (subtotal - discount) * 0.1;
    const total = subtotal + tax - discount;
    const change = parseFloat(paidAmount) - total;

    // Search items
    useEffect(() => {
        if (searchQuery.trim().length > 2) {
            const timeoutId = setTimeout(() => {
                fetch(`/pos/search?query=${encodeURIComponent(searchQuery)}`)
                    .then(response => response.json())
                    .then(data => setSearchResults(data))
                    .catch(error => console.error('Search error:', error));
            }, 300);

            return () => clearTimeout(timeoutId);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Add item to cart
    const addToCart = (item: Item, uom: UOM) => {
        const existingIndex = cart.findIndex(
            cartItem => cartItem.item.id === item.id && cartItem.selectedUom.name === uom.name
        );

        if (existingIndex >= 0) {
            const newCart = [...cart];
            newCart[existingIndex].quantity += 1;
            newCart[existingIndex].subtotal = newCart[existingIndex].quantity * uom.sale_price;
            setCart(newCart);
        } else {
            setCart([...cart, {
                item,
                selectedUom: uom,
                quantity: 1,
                subtotal: uom.sale_price
            }]);
        }
        setSearchQuery('');
        setSearchResults([]);
    };

    // Update cart item quantity
    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(index);
            return;
        }

        const newCart = [...cart];
        newCart[index].quantity = newQuantity;
        newCart[index].subtotal = newQuantity * newCart[index].selectedUom.sale_price;
        setCart(newCart);
    };

    // Remove item from cart
    const removeFromCart = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    // Process transaction
    const processTransaction = async () => {
        if (cart.length === 0 || parseFloat(paidAmount) < total) {
            alert('Please add items and ensure paid amount is sufficient.');
            return;
        }

        setIsProcessing(true);

        const transactionData = {
            items: cart.map(cartItem => ({
                item_id: cartItem.item.id,
                uom_name: cartItem.selectedUom.name,
                quantity: cartItem.quantity,
                unit_price: cartItem.selectedUom.sale_price,
            })),
            paid_amount: parseFloat(paidAmount),
            discount_amount: discount,
        };

        try {
            const response = await fetch('/pos/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(transactionData),
            });

            const result = await response.json();

            if (result.success) {
                setLastTransaction(result.transaction);
                setShowReceipt(true);
                setCart([]);
                setPaidAmount('');
                setDiscountAmount('');
                // Refresh page to get updated recent transactions
                setTimeout(() => {
                    router.reload();
                }, 2000);
            } else {
                alert('Transaction failed: ' + result.message);
            }
        } catch (error) {
            console.error('Transaction error:', error);
            alert('Transaction failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Head title="🏪 Point of Sale System" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🏪</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">POS System</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href="/items" className="text-sm text-blue-600 hover:text-blue-800">📦 Items</a>
                                <a href="/categories" className="text-sm text-blue-600 hover:text-blue-800">📂 Categories</a>
                                <a href="/transactions" className="text-sm text-blue-600 hover:text-blue-800">📊 Transactions</a>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Search & Cart */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Search */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">🔍 Search Items</h2>
                                <input
                                    type="text"
                                    placeholder="Scan barcode or search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                />
                                
                                {/* Search Results */}
                                {searchResults.length > 0 && (
                                    <div className="mt-4 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                                        {searchResults.map((item) => (
                                            <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {item.barcode} • {item.category} • Stock: {item.stock_quantity} {item.smallest_unit}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.uoms.map((uom) => (
                                                            <button
                                                                key={uom.name}
                                                                onClick={() => addToCart(item, uom)}
                                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                                            >
                                                                {uom.name} - Rp{uom.sale_price.toLocaleString()}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">🛒 Shopping Cart</h2>
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">Cart is empty. Search and add items above.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((cartItem, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{cartItem.item.name}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {cartItem.selectedUom.name} @ Rp{cartItem.selectedUom.sale_price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => updateQuantity(index, cartItem.quantity - 1)}
                                                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-12 text-center">{cartItem.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(index, cartItem.quantity + 1)}
                                                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">Rp{cartItem.subtotal.toLocaleString()}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(index)}
                                                        className="text-red-600 hover:text-red-800 ml-2"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Checkout & Recent Transactions */}
                        <div className="space-y-6">
                            {/* Checkout */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">💳 Checkout</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>Rp{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount:</span>
                                        <input
                                            type="number"
                                            value={discountAmount}
                                            onChange={(e) => setDiscountAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-24 text-right border border-gray-300 rounded px-2 py-1"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax (10%):</span>
                                        <span>Rp{tax.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total:</span>
                                        <span>Rp{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Paid Amount:</label>
                                        <input
                                            type="number"
                                            value={paidAmount}
                                            onChange={(e) => setPaidAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    {paidAmount && parseFloat(paidAmount) >= total && (
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-green-800 font-medium">
                                                Change: Rp{change.toLocaleString()}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={processTransaction}
                                        disabled={cart.length === 0 || parseFloat(paidAmount) < total || isProcessing}
                                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? 'Processing...' : 'Process Transaction'}
                                    </button>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">📋 Recent Transactions</h2>
                                {recentTransactions.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No recent transactions</p>
                                ) : (
                                    <div className="space-y-3">
                                        {recentTransactions.map((transaction) => (
                                            <div key={transaction.id} className="p-3 border border-gray-200 rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-sm">{transaction.transaction_number}</p>
                                                        <p className="text-xs text-gray-500">{transaction.items_count} items</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">Rp{transaction.total_amount.toLocaleString()}</p>
                                                        <p className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleTimeString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Receipt Modal */}
                {showReceipt && lastTransaction && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold">✅ Transaction Complete!</h3>
                                <p className="text-gray-600">#{lastTransaction.transaction_number}</p>
                            </div>
                            
                            <div className="text-center py-4 border-t border-b border-gray-200 my-4">
                                <p className="text-2xl font-bold text-green-600">
                                    Change: Rp{lastTransaction.change_amount.toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={() => setShowReceipt(false)}
                                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}