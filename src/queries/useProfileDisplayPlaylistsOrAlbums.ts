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

interface ProfileDisplayPlaylistsOrAlbumsResponse {
  userId: string
  role: string
}

const getProfileDisplayPlaylistsOrAlbums = async ({
  userId,
  role,
}: ProfileDisplayPlaylistsOrAlbumsResponse) => {
  const playlistType = role === 'user' ? 'playlist' : 'album'

  return await http.get<PlaylistOnlyResponse[]>('/users/playlists', {
    params: {
      userId: userId,
      filter: playlistType,
    },
  })
}

const useProfileDisplayPlaylistsOrAlbums = ({
  userId,
  role,
}: ProfileDisplayPlaylistsOrAlbumsResponse) => {
  const [playlistsOnly, setPlaylistsOnly] = useState<PlaylistOnlyResponse[]>()
  useEffect(() => {
    if (!userId) return
    getProfileDisplayPlaylistsOrAlbums({ userId, role })
      .then(setPlaylistsOnly)
      .catch(console.log)
  }, [userId])

  return playlistsOnly
}

export { useProfileDisplayPlaylistsOrAlbums }
