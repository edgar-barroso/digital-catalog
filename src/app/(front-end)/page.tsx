"use client"
import { useEffect, useState } from 'react'
import { Product } from './_types/types'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import { ProductCard } from './_components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(() => setError('Erro ao buscar produtos'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#171717] to-[#262626] text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffe066] mb-4 tracking-tight">
              Descubra nossos produtos
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Uma seleção exclusiva de itens com design moderno e qualidade excepcional para atender às suas necessidades.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#ffe066] hover:bg-[#bfa14a] text-[#171717] font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Ver destaques
              </button>
              <button className="bg-transparent hover:bg-white/10 text-[#ffe066] border border-[#ffe066] font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                Ver categorias
              </button>
            </div>
          </div>
        </div>
      
        {/* Products Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-[#f5f5f5] to-white dark:from-[#18120b] dark:to-[#1a1612]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-[#171717] dark:text-[#ffe066]">Nossos Produtos</h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-white dark:bg-[#262626] shadow-sm hover:shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#171717] dark:text-[#ffe066]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-white dark:bg-[#262626] shadow-sm hover:shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#171717] dark:text-[#ffe066]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffe066]"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">{error}</p>
                <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Tentar novamente
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {products.length === 0 && (
                  <div className="text-center p-16">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-[#bfa14a]/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-xl font-medium text-gray-500 dark:text-[#bfa14a]/60">Nenhum produto cadastrado</p>
                    <p className="text-gray-400 dark:text-[#bfa14a]/40 mt-2">Os produtos aparecerão aqui quando forem adicionados</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-[#f9f9f9] dark:bg-[#171717]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#171717] dark:text-[#ffe066]">
              Por que escolher nossos produtos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#262626] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#ffe066]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#171717] dark:text-white">Alta Qualidade</h3>
                <p className="text-gray-600 dark:text-gray-300">Todos os nossos produtos passam por rigorosos controles de qualidade.</p>
              </div>
              
              <div className="bg-white dark:bg-[#262626] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#ffe066]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#171717] dark:text-white">Preços Competitivos</h3>
                <p className="text-gray-600 dark:text-gray-300">Oferecemos os melhores preços do mercado sem comprometer a qualidade.</p>
              </div>
              
              <div className="bg-white dark:bg-[#262626] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-[#ffe066]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#171717] dark:text-white">Envio Rápido</h3>
                <p className="text-gray-600 dark:text-gray-300">Entregamos seus produtos rapidamente para que você possa aproveitá-los o quanto antes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
