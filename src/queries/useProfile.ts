import { http } from '@/services/apiAxios'
import useSWR from 'swr'

interface ProfileResponse {
  username: string
  profilePicture: string
  followerCount: number
  followingCount: number
  playlistCount: number
  roles: string
}

const getUserProfile = () => {
  return http.get<ProfileResponse>('users/profile/me')
}

const useRoleProfile = () => {
  return useSWR('/users/profile/me', () =>
    getUserProfile().then((profile) => profile.roles)
  )
}

const useUserProfile = () => {
  return useSWR('/users/profile/me', getUserProfile)
}

export { getUserProfile, useUserProfile, useRoleProfile }
