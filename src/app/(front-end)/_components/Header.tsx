"use client";
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#171717] to-[#262626] text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#ffe066] tracking-tight">DigitalCatalog</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#ffe066] hover:text-white transition duration-200">
              Home
            </Link>
            <Link href="/categories" className="text-[#ffe066] hover:text-white transition duration-200">
              Categorias
            </Link>
            <Link href="/about" className="text-[#ffe066] hover:text-white transition duration-200">
              Sobre
            </Link>
            <Link href="/contact" className="text-[#ffe066] hover:text-white transition duration-200">
              Contato
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-[#ffe066] hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link href="/" 
              className="block text-[#ffe066] hover:text-white transition duration-200"
              onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/categories" 
              className="block text-[#ffe066] hover:text-white transition duration-200"
              onClick={() => setMobileMenuOpen(false)}>
              Categorias
            </Link>
            <Link href="/about" 
              className="block text-[#ffe066] hover:text-white transition duration-200"
              onClick={() => setMobileMenuOpen(false)}>
              Sobre
            </Link>
            <Link href="/contact" 
              className="block text-[#ffe066] hover:text-white transition duration-200"
              onClick={() => setMobileMenuOpen(false)}>
              Contato
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
