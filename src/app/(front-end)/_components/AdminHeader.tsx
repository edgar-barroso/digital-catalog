"use client";
import Link from 'next/link';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#171717] to-[#262626] text-white py-6 px-4 mb-8 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#ffe066]">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-300">{subtitle}</p>}
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link 
            href="/" 
            className="px-4 py-2 bg-transparent border border-[#ffe066] text-[#ffe066] rounded-md hover:bg-[#ffe066]/10 transition duration-200 text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar para Home
          </Link>
          <button 
            className="px-4 py-2 bg-[#ffe066] text-[#171717] rounded-md hover:bg-[#bfa14a] transition duration-200 text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar Lista
          </button>
        </div>
      </div>
    </div>
  );
}
