import { usePlaylistByUserId } from '@/queries/usePlaylist'
import {
  useFollower,
  useFollowing,
  useUserProfileById,
} from '@/queries/useProfile'
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PlaylistCard from '../Playlist/PlaylistCard'
import TabPanel from '../TabPanel'

interface ProfileContent {
  userId?: string
}

const ProfileContent = ({ userId }: ProfileContent) => {
  const router = useRouter()
  const [value, setValue] = useState(0)
  const userProfile = useUserProfileById(userId)
  const followers = useFollower(userId)
  const following = useFollowing(userId)
  const isArtist = userProfile.data?.roles.includes('artist')
  const playlistFilter = !userProfile.isLoading
    ? isArtist
      ? 'album'
      : 'playlist'
    : undefined
  const playlists = usePlaylistByUserId(userId, playlistFilter)
  const playlistTabText = isArtist ? 'Albums' : 'Playlists'

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(_event, newValue) => setValue(newValue)}
        textColor="inherit"
        sx={{ color: 'white' }}
      >
        <Tab label={playlistTabText} value={0} />
        {isArtist && <Tab label="Follower" value={1} />}
        <Tab label="Following" value={2} />
      </Tabs>
      <TabPanel index={0} value={value}>
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
      </TabPanel>
      <TabPanel index={1} value={value}>
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
                  onClick={() => router.push(`/profile/${follower.userId}`)}
                >
                  <Stack direction="row" spacing={2} alignItems={'center'}>
                    <Image
                      src={follower.profileImage}
                      alt="follower-image"
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
      </TabPanel>
      <TabPanel index={2} value={value}>
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
                  onClick={() => router.push(`/profile/${_following.userId}`)}
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
      </TabPanel>
    </Box>
  )
}

export default ProfileContent
