import { Box, IconButton, Stack, Typography } from '@mui/material'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import Image from 'next/image'

interface FullSizeContentProps {
  title: string
  artist: string
  coverImage: string
  onClose?: () => void
}

const FullSizeContent = ({
  title,
  artist,
  coverImage,
  onClose,
}: FullSizeContentProps) => {
  return (
    <Stack alignItems="center" height={'100%'}>
      <Stack direction="row" width={'100%'}>
        <Box flex={1} />
        <Stack direction="row" spacing={2} alignItems="center">
          <PlayCircleRoundedIcon sx={{ fontSize: '40px' }} />
          <Typography variant="h1">Now Playing</Typography>
        </Stack>
        <Stack flex={1} alignItems="end" zIndex={10}>
          <IconButton color="inherit" onClick={() => onClose?.()}>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: '96px' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        justifyContent={'space-evenly'}
        alignItems={'center'}
        height={'100%'}
      >
        <Image
          src={coverImage}
          alt="cover-image"
          width={350}
          height={350}
          style={{ borderRadius: '8px' }}
        />
        <Stack spacing={2} alignItems="center">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="h4">{artist}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FullSizeContent
