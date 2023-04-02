import { http } from '@/services/apiAxios'
import { useState, useEffect } from 'react'

interface ProfileResponse {
  username: string
  profilePicture: string
  followerCount: number
  followingCount: number
  playlistCount: number
  roles: string
}

const getRoleProfile = () => {
  return http.get<ProfileResponse>('users/profile/me')
}

const useRoleProfile = () => {
  const [role, setRole] = useState<ProfileResponse>()

  useEffect(() => {
    getRoleProfile().then(setRole).catch(console.log)
  }, [])

  return role?.roles
}

const getUserProfile = () => {
  return http.get<ProfileResponse>('users/profile/me')
}

const useUserProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse>()

  useEffect(() => {
    getUserProfile().then(setProfile).catch(console.log)
  }, [])

  return profile
}

export { getUserProfile, useUserProfile, getRoleProfile, useRoleProfile }
