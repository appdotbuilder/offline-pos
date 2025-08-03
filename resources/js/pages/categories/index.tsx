import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    description?: string;
    items_count: number;
    created_at: string;
}

interface Props {
    categories: {
        data: Category[];
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

export default function CategoriesIndex({ categories }: Props) {
    return (
        <>
            <Head title="📂 Categories Management" />
            
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
                                <h1 className="text-2xl font-bold text-gray-900">📂 Categories Management</h1>
                            </div>
                            <Link
                                href="/categories/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                ➕ Add Category
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-blue-600 text-xl">📂</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Categories</p>
                                    <p className="text-2xl font-bold text-gray-900">{categories.meta.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-green-600 text-xl">📦</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {categories.data.reduce((sum, cat) => sum + cat.items_count, 0)}
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
                                    <p className="text-sm font-medium text-gray-600">Avg Items/Category</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {categories.data.length > 0 ? 
                                            Math.round(categories.data.reduce((sum, cat) => sum + cat.items_count, 0) / categories.data.length) 
                                            : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Grid */}
                    {categories.data.length === 0 ? (
                        <div className="bg-white rounded-lg shadow">
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📂</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                                <p className="text-gray-500 mb-4">Get started by creating your first category.</p>
                                <Link
                                    href="/categories/create"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    ➕ Add First Category
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.data.map((category) => (
                                <div key={category.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {category.name}
                                                </h3>
                                                {category.description && (
                                                    <p className="text-gray-600 text-sm mb-4">
                                                        {category.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                        {category.items_count} items
                                                    </span>
                                                    <span className="ml-3">
                                                        Created {new Date(category.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 flex items-center justify-between">
                                            <Link
                                                href={`/categories/${category.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                View Details →
                                            </Link>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/categories/${category.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {categories.data.length > 0 && categories.links && (
                        <div className="mt-8 bg-white rounded-lg shadow px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    {categories.links[0]?.url && (
                                        <Link
                                            href={categories.links[0].url}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {categories.links[categories.links.length - 1]?.url && (
                                        <Link
                                            href={categories.links[categories.links.length - 1].url!}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{categories.meta.from}</span> to{' '}
                                            <span className="font-medium">{categories.meta.to}</span> of{' '}
                                            <span className="font-medium">{categories.meta.total}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {categories.links.map((link, index) => 
                                                link.url ? (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                            link.active
                                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                            index === categories.links.length - 1 ? 'rounded-r-md' : ''
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
                                                            index === categories.links.length - 1 ? 'rounded-r-md' : ''
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
        </>
    );
}