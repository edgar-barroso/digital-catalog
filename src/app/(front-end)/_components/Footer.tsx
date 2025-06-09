import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] text-[#ededed]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffe066] mb-4">DigitalCatalog</h3>
            <p className="text-sm text-gray-300 mb-4">
              Sua plataforma completa para exibição de produtos digitais com design moderno e eficiente.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffe066] mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#ffe066] transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-[#ffe066] transition duration-200">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#ffe066] transition duration-200">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-[#ffe066] transition duration-200">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffe066] mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-300">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contato@digitalcatalog.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} DigitalCatalog. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
