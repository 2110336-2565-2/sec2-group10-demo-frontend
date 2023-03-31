import { API_HOST } from '@/configs'
import { useError } from '@/hooks/useError'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'
import { SWRConfig } from 'swr'

class AxiosClient {
  axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_HOST,
    })

    this.axiosInstance.interceptors.request.use(async (req) => {
      const session = await getSession()
      if (session?.accessToken) {
        req.headers['Authorization'] = `Bearer ${session?.accessToken}`
      }
      return req
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // TODO: add error handle
        console.log(error.response)
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return (await this.axiosInstance.get<T>(url, config)).data
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) {
    return (await this.axiosInstance.post<T>(url, data, config)).data
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) {
    return (await this.axiosInstance.put<T>(url, data, config)).data
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) {
    return (await this.axiosInstance.patch<T>(url, data, config)).data
  }

  async del(url: string, config?: AxiosRequestConfig) {
    await this.axiosInstance.delete(url, config)
  }
}

export const HttpProvider = ({ children }: React.PropsWithChildren) => {
  const { onError } = useError()

  return (
    <SWRConfig
      value={{
        onError: onError,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export const http = new AxiosClient()
