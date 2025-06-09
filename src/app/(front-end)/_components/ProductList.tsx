import Image from "next/image";
import { Product } from "../_types/types";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductList({ products, onDelete }: ProductListProps) {
    if (products.length === 0) {
      return (
        <div className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-8 text-center">
          <div className="flex flex-col items-center justify-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-[#bfa14a]/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500 dark:text-[#bfa14a]/60 text-lg">Nenhum produto cadastrado</p>
            <p className="text-gray-400 dark:text-[#bfa14a]/40 mt-2 text-sm">
              Os produtos adicionados aparecerão aqui
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <ul className="bg-white dark:bg-[#262626] rounded-xl shadow-md divide-y divide-gray-200 dark:divide-[#bfa14a]/10">
        {products.map(product => (
          <ProductItem key={product.id} product={product} onDelete={onDelete} />
        ))}
      </ul>
    )
}

function ProductItem({ product, onDelete }: { product: Product; onDelete: (id: string) => void }) {
  return (
    <li className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1a1612] transition duration-200">
      <div className="flex items-center">
        <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 dark:bg-[#333] flex-shrink-0 border border-gray-200 dark:border-[#bfa14a]/20">
          {product.imageUrl ? (
            <Image 
              width={80} 
              height={80} 
              src={product.imageUrl} 
              alt={product.name} 
              className="h-full w-full object-cover" 
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-[#bfa14a] font-semibold">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(product.id)} 
        className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        title="Remover produto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Excluir
      </button>
    </li>
  )
}