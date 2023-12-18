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

type ConfigInfo = Partial<AxiosConfigWithMetadata> & { axiosId?: string };

const interceptRequest = (config: AxiosConfigWithMetadata): AxiosConfigWithMetadata => {
  const axiosId = uuidv4()
  config.metadata = { axiosId }
  // eslint-disable-next-line
  console.log(`API Request`, { ...getConfigInfo(config) })
  return config
}

const interceptSuccessResponse = (response: AxiosResponse): AxiosResponse => {
  // eslint-disable-next-line
  console.log(`API Response Success`, {
    ...getConfigInfo(response.config),
    status: `${response.status}:${response.statusText}`,
    body: response.data
  })

  return response
}

const interceptorErrorResponse = (error: unknown): Promise<unknown> => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError

    // eslint-disable-next-line
    console.log(`API Response Failure`, {
      ...getConfigInfo(axiosError.response?.config),
      status: axiosError.response?.status,
      body: axiosError.response?.data
    })
  }

  return Promise.reject(error)
}

const getConfigInfo = (config: AxiosConfigWithMetadata | undefined): ConfigInfo => ({
  baseURL: config?.baseURL,
  method: config?.method,
  data: config?.data,
  params: config?.params,
  url: config?.url,
  headers: config?.headers,
  axiosId: config?.metadata?.axiosId
})

export const attachInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(interceptRequest)
  axiosInstance.interceptors.response.use(interceptSuccessResponse, interceptorErrorResponse)
}

