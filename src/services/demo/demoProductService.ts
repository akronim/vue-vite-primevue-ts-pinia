import { type DemoProduct } from '@/models/demo/demoProduct'
import { attachInterceptors } from '../axiosInterceptors'
import axios from 'axios'
import { logApiError } from '@/utils/error'

const endpoint = `/vue-api/vue-test-one/products`

const API_BASE_URL = `http://localhost:3000` // mockServer.js

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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

export const getProductById = async (id: string): Promise<DemoProduct | undefined> => {
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

export const updateProduct = async (updatedProduct: DemoProduct): Promise<DemoProduct> => {
  try {
    const response = await axiosInstance.put<DemoProduct>(`${endpoint}`, updatedProduct)
    return response.data
  } catch (error) {
    return {} as DemoProduct
  }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`)
    return response.data
  } catch (error) {
    logApiError(error, { fn: `deleteProduct` })
    return false
  }
}
