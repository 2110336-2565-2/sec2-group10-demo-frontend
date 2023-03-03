import { Box, Typography, Stack, Divider } from '@mui/material'
import EditableTypography from '@/components/EditableTypography'
import EditableImage from '@/components/EditableImage'
import Button from '@/components/Button'
import { usePlaylists } from '@/queries/getplaylist'
// import karn
import { useShow } from '@/hooks/useShow'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ButtonStyling = {
  width: '261px',
  height: '44px',
  textTransform: 'none',
}
const UpgradeAccount = () => {
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
            />
          </Stack>
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
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

// TODO: delete mock data
const profileName = 'Username'
const numberOfFollowers = 10
const numberOfFollowing = 10
const profileImage = 'https://picsum.photos/200/400'

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
  const handleSave = (data: EditProfile) => {
    // TODO: call edit profile api
    console.log(data)

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

const Profile = () => {
  const playLists = usePlaylists()
  const numberOfPublicPlaylists = playLists.length
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100%"
      spacing={2.5}
    >
      <ProfileTitle
        profileName={profileName}
        numberOfPublicPlaylists={numberOfPublicPlaylists}
        numberOfFollowers={numberOfFollowers}
        numberOfFollowing={numberOfFollowing}
        profileImageUrl={profileImage}
      />
      <UpgradeAccount />
    </Stack>
  )
}
export default Profile
