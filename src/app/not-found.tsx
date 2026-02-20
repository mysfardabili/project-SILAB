"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Error Graphic */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Search className="w-48 h-48 text-indigo-600" />
          </div>
          <h1 className="text-9xl font-black text-gray-900 tracking-tight">404</h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Page not found
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full sm:w-auto h-11 px-8 bg-white border border-gray-200 hover:bg-gray-100 text-gray-900 rounded-md text-sm font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </button>
          <Link 
            href="/dashboard/home"
            className="inline-flex items-center justify-center w-full sm:w-auto h-11 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm shadow-indigo-200 text-sm font-medium transition-colors"
          >
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </div>
        
      </div>
    </div>
  );
}
