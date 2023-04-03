import Button from '@/components/Button'
import ConfirmDialog from '@/components/ConfirmDialog'
import EditableImage from '@/components/EditableImage'
import EditableTypography from '@/components/EditableTypography'
import MusicPlayer from '@/components/MusicPlayer'
import MusicTable from '@/components/MusicTable'
import { useShow } from '@/hooks/useShow'
import {
  deletePlaylist,
  editPlaylist,
  usePlaylist,
  usePlaylistMusics,
} from '@/queries/usePlaylist'
import { useUserProfile } from '@/queries/useProfile'
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

interface EditPlaylist {
  name: string
  coverImage: File
}

const Playlist = () => {
  const router = useRouter()
  const playlistId = router.query.playlistId as string
  const playlist = usePlaylist(playlistId)
  const musics = usePlaylistMusics(playlistId)
  const user = useUserProfile()

  const isMe = user.data?._id === playlist.data?.creatorId

  const hasMusics = !!musics.data?.length

  const sumDuration =
    musics.data?.reduce((acc, cur) => acc + cur.duration, 0) || 0

  if (playlist.isLoading) return null

  if (!playlist.data) return <Typography>Playlist not found</Typography>
  return (
    <Stack minHeight={'100%'}>
      <PlaylistTitle
        playlistId={playlistId}
        playlistName={playlist.data?.name}
        playlistOwner={playlist.data?.creatorName}
        numberOfSongs={musics.data?.length || 0}
        length={sumDuration}
        coverImageUrl={playlist.data?.coverImage}
        editable={isMe}
      />
      {hasMusics ? (
        <Box
          flex={1}
          mx="-16px !important"
          mb="-24px !important"
          px="16px"
          py="24px"
          bgcolor={alpha('#000', 0.1)}
        >
          <MusicTable playlistId={playlistId} musics={musics.data} />
        </Box>
      ) : null}
      <MusicPlayer />
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
  editable?: boolean
}

const PlaylistTitle = ({
  playlistId,
  playlistName,
  playlistOwner,
  numberOfSongs,
  length,
  coverImageUrl,
  editable,
}: PlaylistTitleProps) => {
  const playlistMore = useShow()
  const saveButton = useShow()
  const deleteDialog = useShow()
  const router = useRouter()
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
        deleteDialog.onShow()
      },
    },
  ]

  const handleDelete = async () => {
    await deletePlaylist(playlistId)
    router.push('/playlists')
  }

  const handleSave = async (data: EditPlaylist) => {
    // TODO: call edit playlist api
    await editPlaylist(playlistId, data)

    // clear state
    reset({}, { keepValues: true })
    saveButton.onClose()
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = ~~((time % 3600) / 60)
    return (
      (hours > 0 ? `${hours} h ` : '') + (minutes > 0 ? `${minutes} m` : '')
    )
  }

  return (
    <>
      <Stack direction="row" py={5} px={4}>
        <Stack position="relative" direction="row" spacing={5} flex={1}>
          <EditableImage
            src={coverImageUrl}
            alt="playlist-cover-image"
            width={200}
            height={200}
            name="coverImage"
            control={control}
            enable={editable}
          />
          <Stack spacing={1.5} flex={1}>
            <EditableTypography
              variant="h1"
              showEditBox={saveButton.show}
              onFocus={saveButton.onShow}
              name="name"
              control={control}
              enable={editable}
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
        {editable && (
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
        )}
      </Stack>
      <ConfirmDialog
        open={deleteDialog.show}
        onConfirm={handleDelete}
        onCancel={deleteDialog.onClose}
      />
    </>
  )
}
