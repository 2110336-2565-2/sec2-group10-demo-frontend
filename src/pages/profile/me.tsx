import { Box, Typography, Stack, Divider, Grid } from '@mui/material'
import EditableTypography from '@/components/EditableTypography'
import EditableImage from '@/components/EditableImage'
import Button from '@/components/Button'
import { usePlaylists } from '@/queries/usePlaylist'
import { useFollower, useFollowing } from '@/queries/useProfile'
// import karn
import { useShow } from '@/hooks/useShow'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PremiumRegisterForm from '@/components/PremiumRegisterForm'
import { useUserProfile, useRoleProfile } from '@/queries/useProfile'
import ArtistRegisterForm from '@/components/ArtistRegisterForm'
import PlaylistCard from '@/components/Playlist/PlaylistCard'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Image from 'next/image'
import { http } from '@/services/apiAxios'
import axios from 'axios'
import { useRouter } from 'next/router'
const ButtonStyling = {
  width: '261px',
  height: '44px',
  textTransform: 'none',
}
const UpgradeAccount = () => {
  const upgradeToPremium = useShow()
  const upgradeToArtist = useShow()
  const userRole = useRoleProfile()
  const isPremium = userRole.data?.includes('premium')
  const isArtist = userRole.data?.includes('artist')
  if (isArtist && isPremium) return null
  return (
    <Box
      width="100%"
      px={3}
      py={4}
      sx={{
        borderRadius: '24px',
        bgcolor: 'container.main',
      }}
    >
      <Stack spacing={1.75}>
        <Typography variant="h3">Upgrade Account</Typography>
        <Divider />

        <Stack spacing={1.75}>
          {!isPremium && (
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="h5">Remove Ads</Typography>
              <Button
                sx={{ ...ButtonStyling }}
                text="Upgrade to Premium"
                variant="contained"
                textVariant="h5"
                onClick={upgradeToPremium.onShow}
                disabled={isPremium}
              />
              <PremiumRegisterForm
                show={upgradeToPremium.show}
                onClose={upgradeToPremium.onClose}
              />
            </Stack>
          )}
          {!isArtist && (
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="h5">Wanna be Artist</Typography>
              <Button
                sx={{ ...ButtonStyling }}
                variant="contained"
                textVariant="h5"
                text="Register"
                onClick={upgradeToArtist.onShow}
                disabled={isArtist}
              />
              <ArtistRegisterForm
                show={upgradeToArtist.show}
                onClose={upgradeToArtist.onClose}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
interface EditProfile {
  name: string
  profileImage: File
}
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
  console.log(profileImageUrl)
  const saveButton = useShow()
  const { handleSubmit, reset, formState, control } = useForm<EditProfile>({
    defaultValues: {
      name: profileName,
      profileImage: undefined,
    },
    mode: 'onChange',
  })
  useEffect(() => {
    if (formState.isDirty) {
      saveButton.onShow()
    }
  }, [formState])

  const cancelEditing = () => {
    reset({
      name: profileName,
      profileImage: undefined,
    })
    saveButton.onClose()
  }
  const handleSave = async (data: EditProfile) => {
    const sendUserNameData = {
      username: data.name,
    }
    const formData = new FormData()
    formData.append('profileImage', data.profileImage)
    await http.patch(`/users/profile`, sendUserNameData).catch((e) => {
      if (axios.isAxiosError(e)) {
        alert(e.response?.data.message)
        console.log(e)
      }
    })
    await http.patch('/users/profile/image', formData)

    // clear state
    reset({}, { keepValues: true })
    saveButton.onClose()
  }
  return (
    <Box width="100%" position="relative">
      <Stack direction="row" spacing={5}>
        <EditableImage
          src={profileImageUrl}
          alt="profile-image"
          width={200}
          height={200}
          name="profileImage"
          control={control}
          borderRadius="50%"
        />
        <Stack spacing={1.25} flex={1}>
          <Typography variant="h4">Profile</Typography>
          <EditableTypography
            variant="h1"
            showEditBox={saveButton.show}
            onFocus={saveButton.onShow}
            name="name"
            control={control}
          >
            {profileName}
          </EditableTypography>
          <Typography variant="subtitle1">{`${numberOfPublicPlaylists} Public Playlist ${numberOfFollowers} Followers ${numberOfFollowing} Following`}</Typography>
          {saveButton.show && (
            <Stack
              position="absolute"
              bottom={0}
              right={0}
              direction="row"
              spacing={1.5}
            >
              <Button
                variant="text"
                text="Cancel"
                textVariant="h5"
                onClick={cancelEditing}
                sx={{ textTransform: 'none' }}
              />
              <Button
                variant="contained"
                text="Save"
                textVariant="h5"
                onClick={handleSubmit(handleSave)}
                sx={{ textTransform: 'none' }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

interface followerFollowingProps {
  _id: string
}
const AlbumsAndFollowerAndFollowingList = ({ _id }: followerFollowingProps) => {
  const playlists = usePlaylists()
  const userRole = useRoleProfile()
  const followers = useFollower(_id)
  const following = useFollowing(_id)
  const router = useRouter()
  const isArtist = userRole.data?.includes('artist')
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
        <Tab value="Playlists" label={initialValue} />
        <Tab value="Follower" label="Follower" />
        <Tab value="Following" label="Following" />
      </Tabs>
      {value === 'Playlists' && (
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
        // display follower list
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
      )}
    </Box>
  )
}

const Profile = () => {
  const playLists = usePlaylists()
  const userProfile = useUserProfile()
  const numberOfPublicPlaylists = playLists.data?.length
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
      <UpgradeAccount />
      <AlbumsAndFollowerAndFollowingList _id={userProfile.data?._id || ''} />
    </Stack>
  )
}
export default Profile
