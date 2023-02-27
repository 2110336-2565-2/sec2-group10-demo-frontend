import Button from '@/components/Button'
import EditableImage from '@/components/EditableImage'
import EditableTypography from '@/components/EditableTypography'
import { useShow } from '@/hooks/useShow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  alpha,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// TODO: delete mock data
const playlistName = 'Playlist Name'
const playlistOwner = 'Playlist Owner'
const numberOfSongs = 10
const length = 120
const coverImage = 'https://picsum.photos/200/400'

interface EditPlaylist {
  name: string
  coverImage: File
}

const Playlist = () => {
  const router = useRouter()
  const playlistId = router.query.playlistId as string

  return (
    <Stack spacing={2} minHeight={'100%'} px={5}>
      <PlaylistTitle
        playlistId={playlistId}
        playlistName={playlistName}
        playlistOwner={playlistOwner}
        numberOfSongs={numberOfSongs}
        length={length}
        coverImageUrl={coverImage}
      />
      <Box
        flex={1}
        mx="-16px !important"
        mb="-24px !important"
        px="16px"
        pb="24px"
        bgcolor={alpha('#000', 0.1)}
      >
        {/* <MusicTable /> */}
        {Array.from({ length: 100 }).map((_, index) => (
          <Box key={index} py={2}>
            <Typography variant="h2">Song {index}</Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  )
}

export default Playlist

interface PlaylistTitleProps {
  playlistId: string
  playlistName: string
  playlistOwner: string
  numberOfSongs: number
  length: number
  coverImageUrl: string
}

const PlaylistTitle = ({
  playlistName,
  playlistOwner,
  numberOfSongs,
  length,
  coverImageUrl,
}: PlaylistTitleProps) => {
  const playlistMore = useShow()
  const saveButton = useShow()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const { handleSubmit, reset, formState, control } = useForm<EditPlaylist>({
    defaultValues: {
      name: playlistName,
      coverImage: undefined,
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
      name: playlistName,
      coverImage: undefined,
    })
    saveButton.onClose()
  }

  const playlistActions = [
    {
      label: 'Delete',
      onClick: () => {
        // TODO: call delete playlist api
      },
    },
  ]

  const handleSave = (data: EditPlaylist) => {
    // TODO: call edit playlist api
    console.log(data)

    // clear state
    reset({}, { keepValues: true })
    saveButton.onClose()
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    return (
      (hours > 0 ? `${hours} h ` : '') + (minutes > 0 ? `${minutes} m` : '')
    )
  }

  return (
    <Stack direction="row" py={5}>
      <Stack position="relative" direction="row" spacing={5} flex={1}>
        <EditableImage
          src={coverImageUrl}
          alt="playlist-cover-image"
          width={200}
          height={200}
          name="coverImage"
          control={control}
        />
        <Stack spacing={1.5} flex={1}>
          <EditableTypography
            variant="h1"
            showEditBox={saveButton.show}
            onFocus={saveButton.onShow}
            name="name"
            control={control}
          >
            {playlistName}
          </EditableTypography>
          <Typography variant="h4">{`By ${playlistOwner}`}</Typography>
          <Typography variant="h4">
            {`${numberOfSongs} song, ${formatTime(length)}`}
          </Typography>
        </Stack>
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
      <Box>
        <IconButton
          onClick={(e) => {
            playlistMore.onShow()
            setAnchorEl(e.currentTarget)
          }}
        >
          <MoreVertIcon fontSize="large" sx={{ color: 'text.primary' }} />
        </IconButton>
        <Menu
          id="playlist-more-menu"
          anchorEl={anchorEl}
          open={playlistMore.show}
          onClose={playlistMore.onClose}
        >
          {playlistActions.map((more) => (
            <MenuItem
              key={more.label}
              onClick={() => {
                more.onClick()
                playlistMore.onClose()
              }}
            >
              {more.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  )
}
