import Image from 'next/image';
import { Product } from '../_types/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white dark:bg-[#1a1612] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#bfa14a]/10 hover:border-[#bfa14a]/30">
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-[#262222]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#262222]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Price tag */}
        <div className="absolute bottom-0 right-0 bg-[#ffe066] px-3 py-1 rounded-tl-lg font-medium text-[#171717]">
          R$ {product.price.toFixed(2)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 dark:text-[#ffe066]/80 text-sm line-clamp-3 mb-3">{product.description}</p>
        )}
        
        <button 
          className="mt-3 w-full bg-gradient-to-r from-[#bfa14a] to-[#ffe066] text-[#171717] font-medium py-2 px-4 rounded-lg hover:from-[#ffe066] hover:to-[#bfa14a] transition-all duration-300"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
