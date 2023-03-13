import { http } from '@/services/apiAxios'
import { useState, useEffect } from 'react'

interface ProfileResponse {
  followerCount: number
  followingCount: number
  playlistCount: number
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

export { getUserProfile, useUserProfile }
