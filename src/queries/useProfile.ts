import { http } from '@/services/apiAxios'
import { useState, useEffect } from 'react'

interface ProfileResponse {
  followerCount: number
  followingCount: number
  playlistCount: number
}

const getRoleProfile = () => {
  return http.get<[]>('/users/role')
}

const useRoleProfile = () => {
  const [role, setRole] = useState<[]>()

  useEffect(() => {
    getRoleProfile().then(setRole).catch(console.log)
  }, [])

  return role
}

const getUserProfile = () => {
  return http.get<ProfileResponse>('users/profile')
}

const useUserProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse>()

  useEffect(() => {
    getUserProfile().then(setProfile).catch(console.log)
  }, [])

  return profile
}

export { getUserProfile, useUserProfile, getRoleProfile, useRoleProfile }
