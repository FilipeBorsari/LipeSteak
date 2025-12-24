import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-off-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e descrição */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <span className="font-serif text-2xl">Lipe</span>
              <span className="font-sans text-2xl font-bold">Steak</span>
              <div className="w-1 h-6 bg-gold ml-2"></div>
            </div>
            <p className="text-sm text-off-white/80 font-sans">
              Experiência de churrasco premium para momentos especiais.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-sans font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-off-white/80 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-off-white/80 hover:text-gold transition-colors">
                  Minha História
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="text-off-white/80 hover:text-gold transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/#orcamento" className="text-off-white/80 hover:text-gold transition-colors">
                  Simular Orçamento
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="font-sans font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-off-white/80">
              <li>Franco da Rocha - SP</li>
              <li>WhatsApp: (11) 96907-3432</li>
              <li>filipeborsari@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold/20 pt-8 text-center text-sm text-off-white/60">
          <p>&copy; {currentYear} LipeSteak. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
