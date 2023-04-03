import { http } from '@/services/apiAxios'
import useSWR from 'swr'

type UserRole = 'user' | 'artist' | 'premium'

interface ProfileResponse {
  username: string
  profileImage: string
  followerCount: number
  followingCount: number
  playlistCount: number
  roles: Array<UserRole>
  _id: string
}
interface FolloweeResponse {
  username: string
  email: string
  profileImage: string
  userId: string
}

const getFollower = async (followeeId: string) => {
  return await http.get<FolloweeResponse[]>(`/users/follower/${followeeId}`)
}
const useFollower = (followeeId: string) => {
  return useSWR(['users/follower', followeeId], () => getFollower(followeeId))
}

const getFollowing = async (followeeId: string) => {
  return await http.get<FolloweeResponse[]>(`/users/following/${followeeId}`)
}
const useFollowing = (followeeId: string) => {
  return useSWR(['users/following', followeeId], () => getFollowing(followeeId))
}

const userKey = (id: string) => {
  return ['users/profile', id] as const
}
const getUserProfileById = async (id: string) => {
  return await http.get<ProfileResponse>(`/users/profile/${id}`)
}

const useUserProfileById = (id: string | undefined) => {
  return useSWR(id ? userKey(id) : null, () => getUserProfileById(id!))
}

const getUserProfile = () => {
  return http.get<ProfileResponse>('users/profile/me')
}

const useRoleProfile = () => {
  return useSWR(['/users/profile/me', 'role'], () =>
    getUserProfile().then((profile) => profile.roles)
  )
}

const useUserProfile = () => {
  return useSWR('/users/profile/me', getUserProfile)
}

export {
  useUserProfile,
  useRoleProfile,
  useFollower,
  useFollowing,
  useUserProfileById,
}
