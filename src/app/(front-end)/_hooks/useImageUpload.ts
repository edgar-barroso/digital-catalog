import { useEffect, useState, useCallback } from 'react'
import { heicToPng } from '../_utils/heic2png'

interface UseImageUploadReturn {
  image: File | null
  imagePreview: string | null
  isConverting: boolean
  error: string | null
  handleImageSelect: (file: File | null) => Promise<void>
  clearImage: () => void
  isValidImageType: (file: File) => boolean
}

interface UseImageUploadOptions {
  maxSizeInMB?: number
  allowedTypes?: string[]
  autoConvertHEIC?: boolean
}

const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif'
]

export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const {
    maxSizeInMB = 15,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    autoConvertHEIC = true
  } = options

  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let url: string | null = null
    let cancelled = false
    const createPreview = async () => {
      if (!image) {
        setImagePreview(null)
        setIsConverting(false)
        return
      }
      setError(null)
      try {
        if ((image.type === 'image/heic' || image.type === 'image/heif') && autoConvertHEIC) {
          setIsConverting(true)
          const pngFile = await heicToPng(image)
          if (cancelled) return
          url = URL.createObjectURL(pngFile)
          setImagePreview(url)
        } else {
          url = URL.createObjectURL(image)
          setImagePreview(url)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Erro ao processar imagem')
          console.error('Erro no processamento da imagem:', err)
        }
      } finally {
        if (!cancelled) {
          setIsConverting(false)
        }
      }
    }
    createPreview()
    return () => {
      cancelled = true
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [image, autoConvertHEIC])

  const isValidImageType = useCallback((file: File): boolean => {
    return allowedTypes.includes(file.type)
  }, [allowedTypes])

  const isValidSize = useCallback((file: File): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    return file.size <= maxSizeInBytes
  }, [maxSizeInMB])

  const handleImageSelect = useCallback(async (file: File | null): Promise<void> => {
    setError(null)

    if (!file) {
      setImage(null)
      return
    }

    // Validar tipo de arquivo
    if (!isValidImageType(file)) {
      setError(`Tipo de arquivo não suportado. Tipos aceitos: ${allowedTypes.join(', ')}`)
      return
    }

    if (!isValidSize(file)) {
      setError(`Arquivo muito grande. Tamanho máximo: ${maxSizeInMB}MB`)
      return
    }

    try {
      if ((file.type === 'image/heic' || file.type === 'image/heif') && autoConvertHEIC) {
        setIsConverting(true)
        const convertedFile = await heicToPng(file)
        setImage(convertedFile)
      } else {
        setImage(file)
      }
    } catch (err) {
      setError('Erro ao processar imagem')
      console.error('Erro na seleção da imagem:', err)
    }
  }, [isValidImageType, isValidSize, maxSizeInMB, allowedTypes, autoConvertHEIC])

  const clearImage = useCallback(() => {
    setImage(null)
    setError(null)
  }, [])

  return {
    image,
    imagePreview, 
    isConverting,
    error,
    handleImageSelect,
    clearImage,
    isValidImageType
  }
}