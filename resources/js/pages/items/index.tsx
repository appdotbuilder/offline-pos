import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Item {
    id: number;
    barcode: string;
    name: string;
    category: string;
    stock_quantity: number;
    smallest_unit: string;
    sale_price: number;
    is_active: boolean;
    uoms_count: number;
}

interface Props {
    items: {
        data: Item[];
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

export default function ItemsIndex({ items }: Props) {
    return (
        <>
            <Head title="📦 Items Management" />
            
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
                                <h1 className="text-2xl font-bold text-gray-900">📦 Items Management</h1>
                            </div>
                            <Link
                                href="/items/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                ➕ Add Item
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-blue-600 text-xl">📦</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                                    <p className="text-2xl font-bold text-gray-900">{items.meta.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-green-600 text-xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Active Items</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {items.data.filter(item => item.is_active).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <span className="text-yellow-600 text-xl">⚠️</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Low Stock</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {items.data.filter(item => item.stock_quantity < 10).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <span className="text-purple-600 text-xl">📊</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Avg UOMs</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {items.data.length > 0 ? 
                                            Math.round(items.data.reduce((sum, item) => sum + item.uoms_count, 0) / items.data.length) 
                                            : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Items List</h2>
                        </div>
                        
                        {items.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                                <p className="text-gray-500 mb-4">Get started by adding your first item.</p>
                                <Link
                                    href="/items/create"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    ➕ Add First Item
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                UOMs
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items.data.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                        <div className="text-sm text-gray-500">{item.barcode}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.stock_quantity} {item.smallest_unit}
                                                    </div>
                                                    {item.stock_quantity < 10 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Low Stock
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Rp{item.sale_price.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {item.uoms_count} UOMs
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        item.is_active 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/items/${item.id}`}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={`/items/${item.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {/* Pagination */}
                        {items.data.length > 0 && items.links && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {items.links[0]?.url && (
                                            <Link
                                                href={items.links[0].url}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {items.links[items.links.length - 1]?.url && (
                                            <Link
                                                href={items.links[items.links.length - 1].url!}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{items.meta.from}</span> to{' '}
                                                <span className="font-medium">{items.meta.to}</span> of{' '}
                                                <span className="font-medium">{items.meta.total}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {items.links.map((link, index) => 
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === items.links.length - 1 ? 'rounded-r-md' : ''
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
                                                                index === items.links.length - 1 ? 'rounded-r-md' : ''
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