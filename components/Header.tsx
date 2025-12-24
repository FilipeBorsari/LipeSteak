'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-off-white border-b border-gold/20 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 focus:outline-none focus:ring-2 focus:ring-gold rounded">
            <span className="font-serif text-3xl md:text-4xl text-charcoal">Lipe</span>
            <span className="font-sans text-3xl md:text-4xl font-bold text-charcoal">Steak</span>
            <div className="w-1 h-8 bg-gold ml-2"></div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/#servicos" 
              className="text-charcoal hover:text-gold transition-colors font-sans font-medium focus:outline-none focus:ring-2 focus:ring-gold rounded px-2 py-1"
            >
              Serviços
            </Link>
            <Link 
              href="/historia" 
              className="text-charcoal hover:text-gold transition-colors font-sans font-medium focus:outline-none focus:ring-2 focus:ring-gold rounded px-2 py-1"
            >
              Minha História
            </Link>
            <Link 
              href="/#orcamento" 
              className="bg-charcoal text-off-white px-6 py-2 rounded hover:bg-opacity-90 transition-all font-sans font-medium focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              Simular Orçamento
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-gold rounded"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-charcoal transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-charcoal transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-charcoal transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gold/20">
            <div className="flex flex-col gap-4">
              <Link 
                href="/#servicos" 
                className="text-charcoal hover:text-gold transition-colors font-sans font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                href="/historia" 
                className="text-charcoal hover:text-gold transition-colors font-sans font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Minha História
              </Link>
              <Link 
                href="/#orcamento" 
                className="bg-charcoal text-off-white px-6 py-3 rounded hover:bg-opacity-90 transition-all font-sans font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Simular Orçamento
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
