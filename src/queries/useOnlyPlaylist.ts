import { http } from '@/services/apiAxios'
import useSWR from 'swr'

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
  return useSWR('/users/playlists/all', getPlaylistOnly)
}

export { usePlaylistOnly }
