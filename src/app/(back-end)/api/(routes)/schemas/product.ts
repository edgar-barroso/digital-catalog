import { z } from 'zod'

export const getProductSchema = z.object({
  productId: z.string()
    .min(1, 'Product ID is required')
})

export const createProductSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  price: z.string()
    .min(1, 'Price is required')
    .max(100, 'Price must be less than 100 characters'),
})

export const deleteProductSchema = z.object({
  productId: z.string()
    .min(1, 'Product ID is required')
})
