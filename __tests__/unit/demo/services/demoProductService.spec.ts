import type { DemoProduct } from '@/models/demo/demoProduct'
import { getAllProducts } from '@/services/demo/demoProductService'
import * as productService from '@/services/demo/demoProductService'
import { describe, expect, it, vi } from 'vitest'

export const mockProducts: DemoProduct[] = [
  {
    id: `1`,
    code: `f230fh0g3`,
    name: `Organic Brown Rice`,
    description: `High-quality brown rice for a healthy diet`,
    price: 3.99,
    category: `Groceries`,
    quantity: 150,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `2`,
    code: `7fdj45hq1`,
    name: `Wireless Bluetooth Earbuds`,
    description: `High-fidelity sound for on-the-go listening`,
    price: 49.99,
    category: `Electronics`,
    quantity: 30,
    inventoryStatus: `OUTOFSTOCK`
  }
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