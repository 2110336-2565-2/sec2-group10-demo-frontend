import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

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
  const [albums, setAlbums] = useState<AlbumResponse[]>()

  useEffect(() => {
    getAlbums().then(setAlbums).catch(console.log)
  }, [])

  return albums
}

const createAlbum = async ({ name, coverImage }: AlbumCreate) => {
  return await http.post<AlbumResponse>('/users/playlists', {
    name: name,
    coverImage: coverImage,
  })
}

export { useAlbums, createAlbum, getAlbums }
