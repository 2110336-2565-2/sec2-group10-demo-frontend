import { http } from '@/services/apiAxios'
import useSWR from 'swr'

const getGenre = () => {
  return http.get<string[]>('users/musics/availableGenre', {})
}

const useGenre = () => {
  return useSWR('/users/musics/availableGenre', getGenre)
}
export { useGenre, getGenre }
