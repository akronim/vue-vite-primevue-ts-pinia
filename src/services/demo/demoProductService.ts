import type { DemoProduct } from '@/models/demo/demoProduct'
import { attachInterceptors } from '../axiosInterceptors'
import axios from 'axios'
import { logApiError } from '@/utils/error'

const endpoint = `/vuetest-one/api/products`

const { PROD, VITE_API_BASE_URL_DEV_ONLY } = import.meta.env

const BASE_URL = PROD ? `/` : VITE_API_BASE_URL_DEV_ONLY

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': `application/json`,
    'Content-Type': `application/json`
  }
})

attachInterceptors(axiosInstance)

export const getAllProducts = async (): Promise<DemoProduct[]> => {
  try {
    const response = await axiosInstance.get<DemoProduct[]>(endpoint)
    return response.data
  } catch (error) {
    return []
  }
}

export const getProductById = async (id: number): Promise<DemoProduct> => {
  try {
    const response = await axiosInstance.get<DemoProduct>(`${endpoint}/${id}`)
    return response.data
  } catch (error) {
    return {} as DemoProduct
  }
}

export const createProduct = async (product: DemoProduct): Promise<DemoProduct> => {
  try {
    const response = await axiosInstance.post<DemoProduct>(endpoint, product)
    return response.data
  } catch (error) {
    return {} as DemoProduct
  }
}

export const updateProduct = async (id: number, updatedProduct: DemoProduct): Promise<DemoProduct> => {
  try {
    const response = await axiosInstance.put<DemoProduct>(`${endpoint}/${id}`, updatedProduct)
    return response.data
  } catch (error) {
    return {} as DemoProduct
  }
}

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`)
    return response.data
  } catch (error) {
    logApiError(error, { fn: `deleteProduct` })
    return false
  }
}
