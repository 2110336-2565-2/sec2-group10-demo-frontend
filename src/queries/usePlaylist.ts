import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface PlaylistResponse {
  _id: string
  name: string
  creatorName: string
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

const createPlaylist = async () => {
  return await http.post<PlaylistResponse>('/users/playlists', {
    name: 'My playlist',
    coverImage:
      'https://media4.giphy.com/media/oFI7FttD0iC8V2Iqmy/200.webp?cid=ecf05e473ikrev2dhowy4c19im8uv2nyp4m3qk9w6jinyw56&rid=200.webp&ct=g',
  })
}

export { usePlaylists, createPlaylist, getPlaylists }
