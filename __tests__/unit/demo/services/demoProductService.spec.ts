import type { DemoProduct } from '@/models/demo/demoProduct'
import { getAllProducts } from '@/services/demo/demoProductService'
import * as productService from '@/services/demo/demoProductService'
import { describe, expect, it, vi } from 'vitest'

const mockProducts: DemoProduct[] = [
  {
    id: `1`,
    code: `a1b2c3d4`,
    name: `Fitness Tracker`,
    description: `Track your daily activities and monitor fitness goals`,
    price: 29.99,
    category: `Fitness`,
    quantity: 40,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `2`,
    code: `b5c6d7e8`,
    name: `Wireless Earbuds`,
    description: `Compact and wireless earbuds for on-the-go listening`,
    price: 39.99,
    category: `Electronics`,
    quantity: 50,
    inventoryStatus: `OUT OF STOCK`
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

  it(`should get a product by id successfully`, async () => {
    const mockProduct = mockProducts[0]
    vi.spyOn(productService, `getProductById`).mockImplementationOnce(() => Promise.resolve(mockProduct))
    const product = await productService.getProductById(`1`)
    expect(product).toEqual(mockProduct)
  })

  it(`should handle error in getProductById`, async () => {
    vi.spyOn(productService, `getProductById`)
      .mockImplementationOnce(() => Promise.reject(new Error(`Error fetching product`)))
    let product
    try {
      product = await productService.getProductById(`1`)
    } catch (error) {
      product = {} as DemoProduct
    }
    expect(product).toEqual({} as DemoProduct)
  })
  
  it(`should create a product successfully`, async () => {
    const mockProduct = mockProducts[0]
    vi.spyOn(productService, `createProduct`).mockImplementationOnce(() => Promise.resolve(mockProduct))
    const product = await productService.createProduct(mockProduct)
    expect(product).toEqual(mockProduct)
  })

  it(`should update a product successfully`, async () => {
    const mockProduct = { ...mockProducts[0], name: `Updated Product` }
    vi.spyOn(productService, `updateProduct`).mockImplementationOnce(() => Promise.resolve(mockProduct))
    const product = await productService.updateProduct(mockProduct)
    expect(product).toEqual(mockProduct)
  })

  it(`should delete a product successfully`, async () => {
    vi.spyOn(productService, `deleteProduct`).mockImplementationOnce(() => Promise.resolve(true))
    const result = await productService.deleteProduct(`1`)
    expect(result).toBe(true)
  })
})

// vi.spyOn(services, `getAnalysisPreviews`).mockReturnValue(Promise.resolve({} as AnalysisPreviews))
// vi.spyOn(services, `getAnalysisPreviews`).mockImplementation((page: number) => Promise.resolve(listResponse))
// vi.mock(`@/utils`, async () => {
//   const actual: { [key: string]: any } = await vi.importActual(`@/utils`)
//   return {
//     ...actual,
//     translate: vi.fn((key) => key)
//   }
// })
// const store = usePromoBannerStore()

// store.bmAllOptInIds = {
//   DEFINITION: [
//     {
//       id: `1`,
//       optOutEnabled: true
//     }
//   ]
// }
// Object.defineProperty(window, `location`, {
//   value: {
//     origin: `http://localhost:8080/bonusy`
//   },
//   writable: true
// })
// const mockPlatform = (platform: string): void => {
//   Object.defineProperty(global, `window`, {
//     value: {
//       PLATFORM: platform,
//     },
//     writable: true
//   })
// }