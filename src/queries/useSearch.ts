import { http } from '@/services/apiAxios'
import useSWR from 'swr'

const QUERY_LIMIT = 5

interface MusicSearch {
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

interface PlaylistSearch {
  _id: string
  name: string
  description: string
  coverImage: string
  isAlbum: boolean
  creatorName: string
  creatorId: string
}

interface ArtistSearch {
  _id: string
  name: string
  description: string
  coverImage: string
  isAlbum: boolean
  creatorName: string
  creatorId: string
}

const getMusicSearch = (search: string) => {
  return http.get<MusicSearch[]>(`users/search/musics`, {
    params: {
      term: search,
      limit: QUERY_LIMIT,
    },
  })
}

const musicSearchKey = (search: string) => {
  return search ? ['users/search/musics', search] : null
}

const getPlaylistSearch = (search: string) => {
  return http.get<PlaylistSearch[]>(`users/search/playlists`, {
    params: {
      term: search,
      limit: QUERY_LIMIT,
    },
  })
}

const playlistSearchKey = (search: string) => {
  return search ? ['users/search/playlists', search] : null
}

const getArtistSearch = (search: string) => {
  return http.get<ArtistSearch[]>(`users/search/artists`, {
    params: {
      term: search,
      limit: QUERY_LIMIT,
    },
  })
}

const artistSearchKey = (search: string) => {
  return search ? ['users/search/artists', search] : null
}

const useMusicSearch = (search: string) => {
  return useSWR(musicSearchKey(search), () => getMusicSearch(search))
}

const usePlaylistSearch = (search: string) => {
  return useSWR(playlistSearchKey(search), () => getPlaylistSearch(search))
}

const useArtistSearch = (search: string) => {
  return useSWR(artistSearchKey(search), () => getArtistSearch(search))
}

export { useMusicSearch, usePlaylistSearch, useArtistSearch }
