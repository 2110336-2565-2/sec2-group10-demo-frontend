import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface PlaylistResponse {
  _id: string
  name: string
  creatorName: string
  coverImage: string
}

interface PlaylistCreate {
  name: string
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

const createPlaylist = async ({ name, coverImage }: PlaylistCreate) => {
  return await http.post<PlaylistResponse>('/users/playlists', {
    name: name,
    coverImage: coverImage,
  })
}

export { usePlaylists, createPlaylist, getPlaylists }
