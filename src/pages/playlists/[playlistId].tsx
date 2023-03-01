import Button from '@/components/Button'
import EditableImage from '@/components/EditableImage'
import EditableTypography from '@/components/EditableTypography'
import MusicPlayer from '@/components/MusicPlayer'
import MusicTable from '@/components/MusicTable'
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
const musics = [
  {
    id: '1',
    title: 'ความคิดถึงที่ส่งไปไม่ถึง',
    artist: 'Paper Planes',
    album: 'Hers',
    length: 255,
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/05+%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%96%E0%B8%B6%E0%B8%87.m4a',
  },
  {
    id: '2',
    title: 'เสแสร้ง (Pretend) [feat. Moon]',
    artist: 'Paper Planes',
    album: 'Hers',
    length: 223,
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/01+%E0%B9%80%E0%B8%AA%E0%B9%81%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%87+(Pretend)+%5Bfeat.+Moon%5D+-+Paper+Planes.mp3',
  },
  {
    id: '3',
    title: 'ซ้ำซ้ำ',
    artist: 'Paper Planes',
    album: 'Hers',
    length: 240,
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/02+%E0%B8%8B%E0%B9%89%E0%B8%B3%E0%B8%8B%E0%B9%89%E0%B8%B3.m4a',
  },
]

const playlistName = 'Playlist Name'
const playlistOwner = 'Playlist Owner'
const numberOfSongs = musics.length
const length = musics.reduce((acc, cur) => acc + cur.length, 0)
const coverImage = 'https://picsum.photos/200/400'

interface EditPlaylist {
  name: string
  coverImage: File
}

const Playlist = () => {
  const router = useRouter()
  const playlistId = router.query.playlistId as string

  return (
    <Stack minHeight={'100%'}>
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
        py="24px"
        bgcolor={alpha('#000', 0.1)}
      >
        <MusicTable musics={musics} />
      </Box>
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
    const hours = Math.floor(time / 3600)
    const minutes = ~~((time % 3600) / 60)
    return (
      (hours > 0 ? `${hours} h ` : '') + (minutes > 0 ? `${minutes} m` : '')
    )
  }

  return (
    <Stack direction="row" py={5} px={4}>
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
