import { Box, Typography, Stack, Grid } from '@mui/material'
import { usePlaylistByUserId } from '@/queries/usePlaylist'
import {
  useFollower,
  useFollowing,
  useUserProfile,
  useUserProfileById,
} from '@/queries/useProfile'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PlaylistCard from '@/components/Playlist/PlaylistCard'

interface ProfileTitleProps {
  profileName: string
  numberOfPublicPlaylists: number
  numberOfFollowers: number
  numberOfFollowing: number
  profileImageUrl: string
}
const ProfileTitle = ({
  profileName,
  numberOfPublicPlaylists,
  numberOfFollowers,
  numberOfFollowing,
  profileImageUrl,
}: ProfileTitleProps) => {
  return (
    <Box width="100%" position="relative">
      <Stack direction="row" spacing={5}>
        <Image
          src={profileImageUrl}
          alt="image-id"
          width={200}
          height={200}
          style={{ borderRadius: '50%' }}
        />
        <Stack spacing={1.25} flex={1}>
          <Typography variant="h4">Profile</Typography>
          <Typography variant="h1">{profileName}</Typography>
          <Typography variant="subtitle1">{`${numberOfPublicPlaylists} Public Playlist ${numberOfFollowers} Followers ${numberOfFollowing} Following`}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

interface followerFollowingProps {
  userRole: Array<string>
  _id: string
}
const AlbumsAndFollowerAndFollowingList = ({
  _id,
  userRole,
}: followerFollowingProps) => {
  const meId = useUserProfile().data?._id
  const router = useRouter()
  const userProfile = useUserProfileById(_id)
  const playlistFilter = !userProfile.isLoading
    ? userProfile.data?.roles.includes('artist')
      ? 'album'
      : 'playlist'
    : undefined
  const playlists = usePlaylistByUserId(_id, playlistFilter)
  const followers = useFollower(_id)
  const following = useFollowing(_id)
  const isArtist = userRole?.includes('artist')
  let initialValue
  if (isArtist) initialValue = 'Albums'
  else initialValue = 'Playlists'

  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        sx={{ color: 'white' }}
      >
        <Tab value="Albums" label={initialValue} />
        {isArtist ? <Tab value="Follower" label="Follower" /> : null}
        <Tab value="Following" label="Following" />
      </Tabs>
      {value === 'Albums' && (
        <Grid container spacing={4.5}>
          {playlists.data?.map((playlist) => {
            return (
              <Grid key={playlist._id} item xs={6} sm={4} md={3} lg={2.4}>
                <PlaylistCard
                  id={playlist._id}
                  playlistName={playlist.name}
                  creatorName={playlist.creatorName}
                  image={playlist.coverImage}
                  isAlbum={playlist.isAlbum}
                />
              </Grid>
            )
          })}
        </Grid>
      )}
      {value === 'Follower' && !!followers.data?.length && (
        // display following list
        <Box px={1.5} py={1.5} sx={{ bgcolor: 'container.light' }}>
          <Stack spacing={1.5}>
            {followers.data?.map((follower, idx) => {
              return (
                <Box
                  key={idx}
                  width="100%"
                  height="69px"
                  display="flex"
                  sx={{
                    bgcolor: 'container.main',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  px={1.5}
                  py={1.5}
                  onClick={() => {
                    if (follower.userId === meId) router.push('/profile/me')
                    else router.push(`/profile/${follower.userId}`)
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems={'center'}>
                    <Image
                      src={follower.profileImage}
                      alt="following-image"
                      width={45}
                      height={45}
                      style={{ borderRadius: '50%' }}
                    />
                    <Typography variant="h5">{follower.username}</Typography>
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        </Box>
      )}
      {value === 'Following' && !!following.data?.length && (
        // display following list
        <Box px={1.5} py={1.5} sx={{ bgcolor: 'container.light' }}>
          <Stack spacing={1.5}>
            {following.data?.map((_following, idx) => {
              return (
                <Box
                  key={idx}
                  width="100%"
                  height="69px"
                  display="flex"
                  sx={{
                    bgcolor: 'container.main',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  px={1.5}
                  py={1.5}
                  onClick={() => {
                    if (_following.userId === meId) router.push('/profile/me')
                    else router.push(`/profile/${_following.userId}`)
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems={'center'}>
                    <Image
                      src={_following.profileImage}
                      alt="following-image"
                      width={45}
                      height={45}
                      style={{ borderRadius: '50%' }}
                    />
                    <Typography variant="h5">{_following.username}</Typography>
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

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
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100%"
      spacing={2.5}
    >
      <ProfileTitle
        profileName={userProfile.data?.username || ''}
        numberOfPublicPlaylists={numberOfPublicPlaylists || 0}
        numberOfFollowers={numberOfFollowers || 0}
        numberOfFollowing={numberOfFollowing || 0}
        profileImageUrl={userProfile.data?.profileImage || ''}
      />

      <AlbumsAndFollowerAndFollowingList
        _id={userProfile.data?._id || ''}
        userRole={userProfile.data?.roles || []}
      />
    </Stack>
  )
}
export default Profile
