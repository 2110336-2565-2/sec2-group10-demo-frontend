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

const followerKey = (followeeId: string) => {
  return ['users/follower', followeeId] as const
}

const getFollower = async (followeeId: string) => {
  return await http.get<FolloweeResponse[]>(`/users/follower/${followeeId}`)
}
const useFollower = (followeeId: string | undefined) => {
  return useSWR(followeeId ? followerKey(followeeId) : null, () =>
    getFollower(followeeId!)
  )
}

const followingKey = (followeeId: string) => {
  return ['users/following', followeeId] as const
}

const getFollowing = async (followeeId: string) => {
  return await http.get<FolloweeResponse[]>(`/users/following/${followeeId}`)
}
const useFollowing = (followeeId: string | undefined) => {
  return useSWR(followeeId ? followingKey(followeeId) : null, () =>
    getFollowing(followeeId!)
  )
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

const useUserProfile = (fetch = true) => {
  return useSWR(fetch ? '/users/profile/me' : null, getUserProfile)
}

const getIsFollowing = async (artistId: string) => {
  return await http.get<boolean>(`/users/isFollowing`, {
    params: {
      artistId: artistId,
    },
  })
}

const useIsFollowing = (artistId: string | undefined) => {
  return useSWR(artistId ? ['/users/isFollowing', artistId] : null, () =>
    getIsFollowing(artistId!)
  )
}

const upgradeToPremium = async (data: { name: string; token: string }) => {
  return await http.put<{
    message: string
    success: boolean
  }>('/users/role/premium', data)
}

export {
  useUserProfile,
  useRoleProfile,
  useFollower,
  useFollowing,
  useUserProfileById,
  useIsFollowing,
  userKey,
  followerKey,
  followingKey,
  getUserProfile,
  upgradeToPremium,
}
