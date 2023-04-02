import { http } from '@/services/apiAxios'
import { useEffect, useState } from 'react'

interface UserDataResponse {
  followerCount: number
  followingCount: number
  playlistCount: number
  profileImage: string
  username: string
  roles: string
}

const getUserData = async (userId: string) => {
  return await http.get<UserDataResponse[]>(`/users/profile/${userId}`)
}

const useUserData = (userId: string) => {
  const [userData, setUserData] = useState<UserDataResponse[]>()

  useEffect(() => {
    if (!userId) return
    getUserData(userId).then(setUserData).catch(console.log)
  }, [userId])

  return userData
}

export { useUserData }
