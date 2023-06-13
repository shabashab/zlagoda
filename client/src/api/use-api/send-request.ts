import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import JwtProvider from '../../providers/jwt.provider'
import { API_BASE_URL, REQUEST_DELAY } from '../config'

const asyncTimeout = (milis: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milis)
  })
}

export const sendRequest = async <TOutput, TInput = any>(
  config: AxiosRequestConfig<TInput>
): Promise<AxiosResponse<TOutput, TInput>> => {
  const requestConfig: AxiosRequestConfig<TInput> = {
    baseURL: API_BASE_URL,
    ...config,
  }

  try {
    console.log(import.meta.env, REQUEST_DELAY)
    if (REQUEST_DELAY && import.meta.env.DEV) {
      await asyncTimeout(REQUEST_DELAY)
    }

    return await axios.request<TOutput>(requestConfig)
  } catch (e) {
    const axiosError = e as AxiosError<TOutput, TInput>

    if (axiosError.response) return axiosError.response

    throw e
  }
}

export const sendAuthenticatedRequest = async <TOutput, TInput = any>(
  config: AxiosRequestConfig<TInput>
): Promise<AxiosResponse<TOutput, TInput>> => {
  const apiKey = JwtProvider.get()

  const requestConfig: AxiosRequestConfig<TInput> = {
    baseURL: API_BASE_URL,
    ...config,
  }

  if (apiKey) {
    requestConfig.headers = {
      Authorization: 'Bearer ' + apiKey,
    }
  }

  try {
    if (REQUEST_DELAY && import.meta.env.DEV) {
      await asyncTimeout(REQUEST_DELAY)
    }

    return await axios.request(requestConfig)
  } catch (e) {
    const axiosError = e as AxiosError<TOutput, TInput>

    if (axiosError.response) {
      if (axiosError.code === '401') JwtProvider.reset()

      return axiosError.response
    } else {
      throw e
    }
  }
}
