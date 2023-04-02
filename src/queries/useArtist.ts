import { http } from '@/services/apiAxios'

const followArtist = (artistId: string) => {
  return http.put(`users/follow/${artistId}`)
}

const unFollowArtist = (artistId: string) => {
  return http.put(`users/unfollow/${artistId}`)
}

export { followArtist, unFollowArtist }
