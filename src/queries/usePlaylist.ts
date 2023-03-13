import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface PlaylistResponse {
  _id: string
  name: string
  description: string
  coverImage: string
  creatorName: string
  creatorId: string
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

const usePlaylist = (id: string | undefined) => {
  const [playlist, setPlaylist] = useState<PlaylistResponse>()
  useEffect(() => {
    if (!id) return
    getPlaylist(id).then(setPlaylist).catch(console.log)
  }, [id])

  return playlist
}

const getPlaylist = async (id: string) => {
  return await http.get<PlaylistResponse>(`/users/playlists/${id}`)
}

const deleteMusicFromPlaylist = async (id: string, playlistId: string) => {
  return await http.del(`/users/playlists/${playlistId}/music/${id}`)
}

const getPlaylistMusics = async (id: string) => {
  return await http.get<MusicResponse[]>(`/users/playlists/${id}/musics`)
}

const usePlaylistMusics = (id: string | undefined) => {
  const [musics, setMusics] = useState<MusicResponse[]>()
  useEffect(() => {
    if (!id) return
    getPlaylistMusics(id).then(setMusics).catch(console.log)
  }, [id])
  return musics
}

interface EditPlaylist {
  name?: string
  description?: string
  coverImage?: File
}
const editPlaylist = (id: string, data: EditPlaylist) => {
  // Todo: use this wait for backend fix
  // const formData = new FormData()
  // if (data.name) formData.append('name', data.name)
  // if (data.description) formData.append('description', data.description)
  // if (data.coverImage) formData.append('coverImage', data.coverImage)
  return http.patch(`/users/playlists/${id}`, data)
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
}
