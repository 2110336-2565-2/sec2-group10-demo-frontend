import { http } from '@/services/apiAxios'
import useSWR from 'swr'

interface PlaylistResponse {
  _id: string
  name: string
  description: string
  coverImage: string
  creatorName: string
  creatorId: string
  isAlbum: boolean
}

export interface MusicResponse {
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

interface PlaylistCreate {
  name: string
  isAlbum: boolean
}

const getPlaylists = () => {
  return http.get<PlaylistResponse[]>('users/playlists/all')
}

const usePlaylists = () => {
  return useSWR('/users/playlists/all', getPlaylists)
}

const createPlaylist = async ({ name, isAlbum }: PlaylistCreate) => {
  return await http.post<PlaylistResponse>('/users/playlists', {
    name: name,
    isAlbum: isAlbum,
  })
}

type PlaylistFilter = 'all' | 'album' | 'playlist'

const userPlaylistKey = (id: string, filter: PlaylistFilter) => {
  return ['users/playlists', id, filter] as const
}
const getPlaylistByUserId = (id: string, filter: PlaylistFilter) => {
  return http.get<PlaylistResponse[]>('users/playlists', {
    params: {
      userId: id,
      filter: filter,
    },
  })
}
const usePlaylistByUserId = (
  id: string | undefined,
  filter: PlaylistFilter | undefined
) => {
  return useSWR(id && filter ? userPlaylistKey(id, filter) : null, () =>
    getPlaylistByUserId(id!, filter!)
  )
}

const playlistKey = (id: string) => {
  return ['users/playlists', id] as const
}

const getPlaylist = async (id: string) => {
  return await http.get<PlaylistResponse>(`/users/playlists/${id}`)
}

const usePlaylist = (id: string | undefined) => {
  return useSWR(id ? playlistKey(id) : null, () => getPlaylist(id!))
}

const deleteMusicFromPlaylist = async (id: string, playlistId: string) => {
  return await http.del(`/users/playlists/${playlistId}/music/${id}`)
}

const playlistMusicsKey = (id: string) => {
  return ['users/playlists', id, 'musics'] as const
}

const getPlaylistMusics = async (id: string) => {
  return await http.get<MusicResponse[]>(`/users/playlists/${id}/musics`)
}

const usePlaylistMusics = (id: string | undefined) => {
  return useSWR(id ? playlistMusicsKey(id) : null, () => getPlaylistMusics(id!))
}

interface EditPlaylist {
  name?: string
  coverImage?: File
}
const editPlaylist = (id: string, data: EditPlaylist) => {
  const formData = new FormData()
  if (data.name) formData.append('name', data.name)
  if (data.coverImage) formData.append('coverImage', data.coverImage)
  return http.patch(`/users/playlists/${id}`, formData)
}

const deletePlaylist = async (id: string) => {
  return await http.del(`/users/playlists/${id}`)
}

export {
  usePlaylists,
  usePlaylist,
  createPlaylist,
  getPlaylists,
  deleteMusicFromPlaylist,
  usePlaylistMusics,
  editPlaylist,
  deletePlaylist,
  usePlaylistByUserId,
  playlistKey,
  playlistMusicsKey,
}
