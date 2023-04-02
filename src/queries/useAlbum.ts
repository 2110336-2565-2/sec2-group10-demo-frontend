import { http } from '@/services/apiAxios'
import useSWR from 'swr'

interface AlbumResponse {
  _id: string
  name: string
  creatorName: string
  coverImage: string
}

interface AlbumCreate {
  name: string
  coverImage: string
}

const getAlbums = () => {
  return http.get<AlbumResponse[]>('users/playlists/all', {
    params: { isAlbum: true },
  })
}

const useAlbums = () => {
  return useSWR('/users/playlists/all', getAlbums)
}

const createAlbum = async ({ name, coverImage }: AlbumCreate) => {
  return await http.post<AlbumResponse>('/users/playlists', {
    name: name,
    coverImage: coverImage,
  })
}

export { useAlbums, createAlbum, getAlbums }
