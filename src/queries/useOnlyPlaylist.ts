import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface PlaylistOnlyResponse {
  _id: string
  name: string
  description: string
  coverImage: string
  creatorName: string
  creatorId: string
}

const getPlaylistOnly = () => {
  return http.get<PlaylistOnlyResponse[]>('users/playlists/all', {
    params: {
      filter: 'playlist',
    },
  })
}

const usePlaylistOnly = () => {
  const [playlistsOnly, setPlaylistsOnly] = useState<PlaylistOnlyResponse[]>()

  useEffect(() => {
    getPlaylistOnly().then(setPlaylistsOnly).catch(console.log)
  }, [])

  return playlistsOnly
}

export { usePlaylistOnly }
