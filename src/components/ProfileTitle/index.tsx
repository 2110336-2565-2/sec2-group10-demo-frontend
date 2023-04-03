import { useShow } from '@/hooks/useShow'
import { http } from '@/services/apiAxios'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import ArtistBadge from '../ArtistBadge'
import Button from '../Button'
import EditableImage from '../EditableImage'
import EditableTypography from '../EditableTypography'
import FollowButton from '../FollowButton'

interface EditProfile {
  name: string
  profileImage: File
}

interface EditProfileProps {
  artistId?: string
  profileName: string
  numberOfPublicPlaylists: number
  numberOfFollowers: number
  numberOfFollowing: number
  profileImageUrl: string
  isArtist?: boolean
  editable?: boolean
}

const ProfileTitle = ({
  artistId,
  numberOfFollowers,
  numberOfFollowing,
  numberOfPublicPlaylists,
  profileImageUrl,
  profileName,
  isArtist,
  editable,
}: EditProfileProps) => {
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

  useEffect(() => {
    reset({
      name: profileName,
    })
  }, [profileName])

  const cancelEditing = () => {
    reset({
      name: profileName,
      profileImage: undefined,
    })
    saveButton.onClose()
  }
  const handleSave = async (data: EditProfile) => {
    if (data.name !== profileName) {
      await http.patch(`/users/profile`, {
        username: data.name,
      })
    }

    if (data.profileImage) {
      const formData = new FormData()
      formData.append('profileImage', data.profileImage)
      await http.patch('/users/profile/image', formData)
    }

    reset({}, { keepValues: true })
    mutate('/users/profile/me')
    saveButton.onClose()
  }

  const titleDescription = () => {
    if (isArtist) {
      return `${numberOfPublicPlaylists} Public Album ${numberOfFollowers} Followers ${numberOfFollowing} Following`
    }
    return `${numberOfPublicPlaylists} Public Playlist ${numberOfFollowing} Following`
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
          enable={editable}
        />
        <Stack spacing={1.25} flex={1}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="h4">Profile</Typography>
            {isArtist && <ArtistBadge />}
          </Stack>
          <EditableTypography
            variant="h1"
            showEditBox={saveButton.show}
            onFocus={saveButton.onShow}
            name="name"
            control={control}
            enable={editable}
          >
            {profileName}
          </EditableTypography>
          <Typography variant="subtitle1">{titleDescription()}</Typography>
          {isArtist && !editable && artistId && (
            <Box>
              <FollowButton artistId={artistId} />
            </Box>
          )}
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

export default ProfileTitle
