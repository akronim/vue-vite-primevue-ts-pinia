import {
  AxiosError,
  isAxiosError, 
  type AxiosResponse, type InternalAxiosRequestConfig, type AxiosInstance
} from "axios"
import { v4 as uuidv4 } from 'uuid'

type AxiosConfigWithMetadata = InternalAxiosRequestConfig & {
    metadata?: {
        axiosId: string
    }
}

const interceptRequest = (config: AxiosConfigWithMetadata) => {
  const axiosId = uuidv4()
  config.metadata = { axiosId }
  console.log(`API Request`, { ...getConfigInfo(config) })
  return config
}

const interceptSuccessResponse = (response: AxiosResponse) => {
  console.log(`API Response Success`, {
    ...getConfigInfo(response.config),
    status: `${response.status}:${response.statusText}`,
    body: response.data
  })

  return response
}

const interceptorErrorResponse = (error: any) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError

    console.log(`API Response Failure`, {
      ...getConfigInfo(axiosError.response?.config),
      status: axiosError.response?.status,
      body: axiosError.response?.data
    })
  }

  return Promise.reject(error)
}

const getConfigInfo = (config: AxiosConfigWithMetadata | undefined) => ({
  baseURL: config?.baseURL,
  method: config?.method,
  data: config?.data,
  params: config?.params,
  url: config?.url,
  headers: config?.headers,
  axiosId: config?.metadata?.axiosId
})

export const attachInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(interceptRequest)
  axiosInstance.interceptors.response.use(interceptSuccessResponse, interceptorErrorResponse)
}

