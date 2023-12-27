import { expect, test, vi } from 'vitest'
import {
  interceptRequest,
  interceptSuccessResponse,
  interceptorErrorResponse,
  type AxiosConfigWithMetadata
} from '@/services/axiosInterceptors'
import type { AxiosResponse } from 'axios'

test(`interceptRequest assigns a new UUID to the config metadata`, () => {
  const config = {}
  const result = interceptRequest(config as AxiosConfigWithMetadata)
  expect(result?.metadata?.axiosId).toBeTruthy()
})

test(`interceptSuccessResponse logs the response details`, () => {
  const response = {
    config: {},
    status: 200,
    statusText: `OK`,
    data: `Success`
  }
  const consoleSpy = vi.spyOn(console, `log`)
  interceptSuccessResponse(response as AxiosResponse)
  expect(consoleSpy).toHaveBeenCalledWith(`API Response Success`, expect.any(Object))
})

test(`interceptorErrorResponse logs the error details and rejects the promise`, async () => {
  const error = {
    config: {},
    isAxiosError: true,
    response: {
      status: 500,
      data: `Error`
    }
  }
  const consoleSpy = vi.spyOn(console, `log`)
  await expect(interceptorErrorResponse(error)).rejects.toEqual(error)
  expect(consoleSpy).toHaveBeenCalledWith(`API Response Failure`, expect.any(Object))
})
