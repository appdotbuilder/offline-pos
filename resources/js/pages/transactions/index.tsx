import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Transaction {
    id: number;
    transaction_number: string;
    total_amount: number;
    status: string;
    items_count: number;
    created_at: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
            from: number;
            to: number;
        };
    };
    [key: string]: unknown;
}

export default function TransactionsIndex({ transactions }: Props) {
    const totalRevenue = transactions.data
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.total_amount, 0);

    const completedTransactions = transactions.data.filter(t => t.status === 'completed').length;

    return (
        <>
            <Head title="📊 Transactions History" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <Link href="/" className="text-blue-600 hover:text-blue-800">
                                    ← Back to POS
                                </Link>
                                <div className="w-px h-6 bg-gray-300"></div>
                                <h1 className="text-2xl font-bold text-gray-900">📊 Transactions History</h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-blue-600 text-xl">📊</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                                    <p className="text-2xl font-bold text-gray-900">{transactions.meta.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-green-600 text-xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-900">{completedTransactions}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <span className="text-purple-600 text-xl">💰</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">Rp{totalRevenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <span className="text-yellow-600 text-xl">📦</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Items Sold</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {transactions.data.reduce((sum, t) => sum + t.items_count, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                        </div>
                        
                        {transactions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📊</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                                <p className="text-gray-500 mb-4">Start making sales to see transaction history here.</p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    🏪 Go to POS
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Items
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.data.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {transaction.transaction_number}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {transaction.id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {transaction.items_count} items
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Rp{transaction.total_amount.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        transaction.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : transaction.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {transaction.status === 'completed' ? '✅ Completed' :
                                                         transaction.status === 'pending' ? '⏳ Pending' :
                                                         '❌ Cancelled'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div>{new Date(transaction.created_at).toLocaleDateString()}</div>
                                                    <div className="text-gray-500">
                                                        {new Date(transaction.created_at).toLocaleTimeString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={`/transactions/${transaction.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {/* Pagination */}
                        {transactions.data.length > 0 && transactions.links && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {transactions.links[0]?.url && (
                                            <Link
                                                href={transactions.links[0].url}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {transactions.links[transactions.links.length - 1]?.url && (
                                            <Link
                                                href={transactions.links[transactions.links.length - 1].url!}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{transactions.meta.from}</span> to{' '}
                                                <span className="font-medium">{transactions.meta.to}</span> of{' '}
                                                <span className="font-medium">{transactions.meta.total}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {transactions.links.map((link, index) => 
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === transactions.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                    : 'bg-white border-gray-300 text-gray-500'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === transactions.links.length - 1 ? 'rounded-r-md' : ''
                                                            } cursor-not-allowed opacity-50`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}