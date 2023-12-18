import type { DemoProduct } from '@/models/demo/demoProduct'
import { getAllProducts } from '@/services/demo/demoProductService'
import * as productService from '@/services/demo/demoProductService'
import { describe, expect, it, vi } from 'vitest'

export const mockProducts: DemoProduct[] = [
  { id: 1, code: `a1b2c3d4e5`, name: `Smartphone X`, category: `Electronics`, quantity: 10 },
  { id: 2, code: `f6g7h8i9j0`, name: `Leather Jacket`, category: `Clothing`, quantity: 20 }
]

describe(`Product Service`, () => {
  it(`should get all products successfully`, async () => {
    vi.spyOn(productService, `getAllProducts`).mockImplementationOnce(() => Promise.resolve(mockProducts))
    const products = await getAllProducts()
    expect(products).toEqual(mockProducts)
  })


  it(`should return an empty arr`, async () => {
    vi.spyOn(productService, `getAllProducts`).mockImplementationOnce(() => Promise.resolve([]))
    const products = await getAllProducts()
    expect(products).toEqual([])
  })
})