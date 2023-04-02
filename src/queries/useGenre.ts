import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

const getGenre = () => {
  return http.get<string[]>('users/musics/availableGenre', {})
}

const useGenre = () => {
  const [genre, setGenre] = useState<string[]>()

  useEffect(() => {
    getGenre().then(setGenre).catch(console.log)
  }, [])

  return genre
}
export { useGenre, getGenre }
