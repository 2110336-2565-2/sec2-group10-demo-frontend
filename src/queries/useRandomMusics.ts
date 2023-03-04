import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface RandomMusicResponse {
  name: string
  coverImage: string
  url: string
  musicId: string
  ownerName: string
}

const getRandomMusic = () => {
  return http.get<RandomMusicResponse[]>('/users/musics/sample/50')
}

const useRandomMusic = () => {
  const [randomMusic, setRandomMusic] = useState<RandomMusicResponse[]>()

  useEffect(() => {
    getRandomMusic().then(setRandomMusic).catch(console.log)
  }, [])

  return randomMusic
}

export { useRandomMusic }
