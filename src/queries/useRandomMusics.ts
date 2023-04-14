import { http } from '@/services/apiAxios'
import useSWR from 'swr'

interface RandomMusicResponse {
  name: string
  albumId: string
  coverImage: string
  url: string
  ownerId: string
  duration: number
  musicId: string
  albumName: string
  ownerName: string
}

const getRandomMusic = () => {
  return http.get<RandomMusicResponse[]>('/users/musics/sample/50')
}

const useRandomMusic = () => {
  return useSWR('/users/musics/sample/50', getRandomMusic, {
    revalidateOnFocus: false,
  })
}

export { useRandomMusic }
