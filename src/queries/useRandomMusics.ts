import { http } from '@/services/apiAxios'
import useSWR from 'swr'
import { MusicResponse } from './usePlaylist'

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

const getRandomMusic = (nSample: number) => {
  return http.get<RandomMusicResponse[]>(`/users/musics/sample/${nSample}`)
}

interface AdsMusicResponse {
  _id: string
  name: string
  description: string
  creationDate: Date
  coverImage: string
  url: string
  duration: number
}

const getRandomAdsMusic = async (): Promise<MusicResponse> => {
  // TODO: get random ads music from api
  const data = await http.get<AdsMusicResponse[]>('/users/advertisement/random')
  return {
    ...data[0],
    musicId: data[0]._id,
    albumId: '',
    ownerId: '',
    albumName: '',
    ownerName: '',
  }
}

const useRandomMusic = (nSample = 50) => {
  return useSWR(
    ['/users/musics/sample', nSample],
    () => getRandomMusic(nSample),
    {
      revalidateOnFocus: false,
    }
  )
}

export { useRandomMusic, getRandomAdsMusic, getRandomMusic }
