import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface PlaylistResponse {
  _id: string
  name: string
  description: string
  coverImage: string
}

const getPlaylists = () => {
  return http.get<PlaylistResponse[]>('users/playlists/all')
}

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>()

  useEffect(() => {
    getPlaylists().then(setPlaylists).catch(console.log)
  }, [])

  return playlists
}

export { usePlaylists }
