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

const getRandomMusic = () => {
  return http.get<RandomMusicResponse[]>('/users/musics/sample/50')
}

const mockAdsMusic = {
  musicId: 'ads',
  name: 'ads',
  albumId: '',
  ownerId: '',
  duration: 244,
  albumName: '',
  ownerName: '',
  coverImage: 'https://picsum.photos/200',
  url: 'https://storage.googleapis.com/demo-tuder-music/music/1680549084308.mp3',
}

const getRandomAdsMusic = (): MusicResponse => {
  // TODO: get random ads music from api
  return mockAdsMusic
}

const useRandomMusic = () => {
  return useSWR('/users/musics/sample/50', getRandomMusic, {
    revalidateOnFocus: false,
  })
}

export { useRandomMusic, getRandomAdsMusic }
