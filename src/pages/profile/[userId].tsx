import ProfileContent from '@/components/ProfileContent'
import ProfileTitle from '@/components/ProfileTitle'
import { usePlaylistByUserId } from '@/queries/usePlaylist'
import { useUserProfileById } from '@/queries/useProfile'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const userProfile = useUserProfileById(userId)
  const playlistFilter = !userProfile.isLoading
    ? userProfile.data?.roles.includes('artist')
      ? 'album'
      : 'playlist'
    : undefined
  const playlists = usePlaylistByUserId(userId, playlistFilter)
  const numberOfPublicPlaylists = playlists.data?.length
  const numberOfFollowers = userProfile.data?.followerCount
  const numberOfFollowing = userProfile.data?.followingCount
  const isArtist = userProfile.data?.roles.includes('artist')
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100%"
      spacing={2.5}
    >
      <ProfileTitle
        artistId={userId}
        profileName={userProfile.data?.username || ''}
        numberOfPublicPlaylists={numberOfPublicPlaylists || 0}
        numberOfFollowers={numberOfFollowers || 0}
        numberOfFollowing={numberOfFollowing || 0}
        profileImageUrl={userProfile.data?.profileImage || ''}
        isArtist={isArtist}
        editable={false}
      />
      <ProfileContent userId={userProfile.data?._id} />
    </Stack>
  )
}
export default Profile
