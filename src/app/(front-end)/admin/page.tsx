"use client"
import Image from 'next/image'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Product } from '../_types/types'
import { ProductList } from '../_components/ProductList'
import { AdminHeader } from '../_components/AdminHeader'
import { Header } from '../_components/Header'
import { Footer } from '../_components/Footer'
import { useImageUpload } from '../_hooks/useImageUpload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([])
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const productFormRef = useRef<HTMLDivElement>(null)

  const {
    image,
    imagePreview,
    isConverting,
    error: imageError,
    handleImageSelect,
    clearImage
  } = useImageUpload({
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    autoConvertHEIC: true
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`)
        
        const data = await res.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
        setError('Erro ao carregar produtos')
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (success) {
      toast.success(success);
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = useCallback(async (id: string) => {
    setError('')
    
    toast.info('Excluindo produto...', { 
      autoClose: 2000,
      position: "top-right"
    });
    
    try {
      setProducts(prev => prev.filter(p => p.id !== id))
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: Falha ao deletar produto`)
      }
      
      setSuccess('Produto removido com sucesso!')
    } catch (err) {
      console.error('Erro ao deletar produto:', err)
      setError('Erro ao remover produto')
      
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products || [])
        }
      } catch (reloadErr) {
        console.error('Erro ao recarregar produtos:', reloadErr)
      }
    }
  }, [])

  const validateForm = (): string | null => {
    if (!name.trim()) return 'Nome é obrigatório'
    if (!description.trim()) return 'Descrição é obrigatória'
    if (!price || parseFloat(price) <= 0) return 'Preço deve ser maior que zero'
    if (!image) return 'Imagem é obrigatória'
    return null
  }

  const resetForm = () => {
    setName('')
    setPrice('')
    setDescription('')
    clearImage()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    
    setLoading(true)
    toast.info('Salvando produto...', { autoClose: false, toastId: 'saving-product' })

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('description', description.trim())
      formData.append('price', price)
      
      if (image) {
        formData.append('image', image)
      }
      
      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Erro ${res.status}: Falha ao cadastrar produto`)
      }
      
      const newProduct = await res.json()
      setProducts(prev => [newProduct, ...prev])
      resetForm()
      setSuccess('Produto cadastrado com sucesso!')
      
      toast.dismiss('saving-product')
      
      if (productFormRef.current) {
        productFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err)
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar produto')
      toast.dismiss('saving-product')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    await handleImageSelect(file)
  }

  const isFormDisabled = loading || isConverting

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-gradient-to-b from-[#f5f5f5] to-white dark:from-[#18120b] dark:to-[#1a1612] py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Admin Header */}
          <AdminHeader 
            title="Painel Administrativo" 
            subtitle="Gerencie os produtos do catálogo" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div ref={productFormRef} className="bg-white dark:bg-[#262626] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#171717] dark:text-[#ffe066] mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Novo Produto
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#bfa14a] focus:border-[#bfa14a] transition bg-white dark:bg-[#1a1612] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 shadow-sm text-base disabled:opacity-50"
                      required
                      disabled={isFormDisabled}
                      placeholder="Digite o nome do produto"
                      autoComplete="off"
                      aria-label="Nome do produto"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full border resize-none border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#bfa14a] focus:border-[#bfa14a] transition bg-white dark:bg-[#1a1612] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 shadow-sm text-base disabled:opacity-50"
                      rows={3}
                      disabled={isFormDisabled}
                      placeholder="Digite a descrição do produto"
                      autoComplete="off"
                      aria-label="Descrição do produto"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preço <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">R$</span>
                      </div>
                      <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full pl-10 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md focus:ring-2 focus:ring-[#bfa14a] focus:border-[#bfa14a] transition bg-white dark:bg-[#1a1612] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 shadow-sm text-base disabled:opacity-50"
                        required
                        disabled={isFormDisabled}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        autoComplete="off"
                        aria-label="Preço do produto"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Imagem <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden group hover:border-[#bfa14a] transition-colors">
                      <label className="cursor-pointer flex flex-col items-center justify-center h-[200px]">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <Image 
                              width={400} 
                              height={400} 
                              src={imagePreview} 
                              alt={image?.name || 'Preview da imagem'} 
                              className="w-full h-full object-contain" 
                            />
                            {isConverting && (
                              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                                <svg className="animate-spin h-8 w-8 text-[#ffe066] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-white text-sm">Convertendo imagem...</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-gray-500 dark:text-gray-400 group-hover:text-[#bfa14a] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mb-1">Clique para selecionar imagem</p>
                            <p className="text-xs">Formatos: JPG, PNG, HEIC, WEBP</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          required
                          disabled={isFormDisabled}
                          onChange={handleImageChange}
                          className="w-0 h-0 opacity-0 absolute"
                          aria-label="Selecionar imagem do produto"
                          capture="environment"
                        />
                      </label>
                    </div>
                    
                    {image && (
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Imagem selecionada: <span className="font-semibold ml-1">{image.name}</span>
                      </div>
                    )}
                    
                    {imageError && (
                      <div className="mt-2 text-xs text-red-500 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {imageError}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#bfa14a] to-[#ffe066] text-[#171717] font-bold hover:from-[#ffe066] hover:to-[#bfa14a] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center" 
                    disabled={isFormDisabled}
                    aria-label="Cadastrar produto"
                  >
                    {isConverting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#171717]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Convertendo imagem...
                      </>
                    ) : loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#171717]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Cadastrar Produto
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Products List Column */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#262626] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#171717] dark:text-[#ffe066] mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#bfa14a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Produtos Cadastrados 
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({products.length})</span>
                </h2>
                
                <ProductList products={products} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}