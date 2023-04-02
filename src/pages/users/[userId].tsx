import { Box, Typography, Stack } from '@mui/material'
import Button from '@/components/Button'
import Image from 'next/image'
import { useProfileDisplayPlaylistsOrAlbums } from '@/queries/useProfileDisplayPlaylistsOrAlbums'
import { useUserData } from '@/queries/useRoleFromUserId'
import ProfileBox from '@/components/ProfileBox'
import { useRouter } from 'next/router'

interface ProfileTitleProps {
  profileName: string
  numberOfPublicPlaylists: number
  numberOfFollowers: number
  numberOfFollowing: number
  profileImageUrl: string
  role: string
}
const ProfileTitle = ({
  profileName,
  numberOfPublicPlaylists,
  numberOfFollowers,
  numberOfFollowing,
  profileImageUrl,
  role,
}: ProfileTitleProps) => {
  return (
    <Box width="100%" position="relative">
      <Stack direction="row" spacing={5}>
        <Image
          src={profileImageUrl}
          alt="profile-image"
          width={200}
          height={200}
          // name="profileImage"
          style={{
            borderRadius: '50%',
          }}
        />
        <Stack spacing={1.25} flex={1}>
          <Stack spacing={1.25} direction="row" alignItems="center">
            <Typography variant="h4">Profile</Typography>
            <>
              {role === 'artist' ? (
                <Button
                  text="Artist"
                  variant="contained"
                  sx={{ borderRadius: 16 }}
                  style={{
                    background:
                      'linear-gradient(to right bottom, #7B7BFF, #1564FE)',
                  }}
                ></Button>
              ) : (
                <></>
              )}
            </>
          </Stack>
          <Typography
            variant="h1"
            // name="name"
          >
            {profileName}
          </Typography>
          <Typography variant="subtitle1">{`${numberOfPublicPlaylists} Public Playlist ${numberOfFollowers} Followers ${numberOfFollowing} Following`}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

const Profile = () => {
  const router = useRouter()
  const userId = router.query.userId as string

  const userProfile = useUserData(userId)

  const numberOfFollowers = userProfile?.followerCount
  const numberOfFollowing = userProfile?.followingCount
  const role = (userProfile?.roles as any)?.includes('artist')
    ? 'artist'
    : 'user'

  const playLists = useProfileDisplayPlaylistsOrAlbums({ userId, role })
  const numberOfPublicPlaylists = playLists?.length

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      width="100%"
      height="100%"
      spacing={2.5}
    >
      <ProfileTitle
        profileName={userProfile?.username || ''}
        numberOfPublicPlaylists={numberOfPublicPlaylists || 0}
        numberOfFollowers={numberOfFollowers || 0}
        numberOfFollowing={numberOfFollowing || 0}
        profileImageUrl={userProfile?.profilePicture || ''}
        role={role}
      />
      <ProfileBox userId={userId} role={role} />
    </Stack>
  )
}

export default Profile
