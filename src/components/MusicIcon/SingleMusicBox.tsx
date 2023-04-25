import LongMenu from '@/components/MusicIcon/LongMenu'
import { Music } from '@/stores/musicPlayerStore'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

interface Props {
  music: Music
  onClick?: () => void
}

const SingleMusicBox = ({ music, onClick }: Props) => {
  return (
    <Box
      px={'6%'}
      py={'5%'}
      pb={'20%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      sx={{
        borderRadius: '4px',
        bgcolor: 'container.light',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Stack spacing={3} justifyContent={'center'}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image
            src={music.coverImage}
            fill
            style={{
              borderRadius: '4px',
            }}
            alt="music-cover-image"
          />
        </Box>
        <Stack spacing={0.5} position="relative">
          <Box
            position="absolute"
            top={0}
            right={0}
            onClick={(e) => e.stopPropagation()}
          >
            <LongMenu musicID={music.musicId} />
          </Box>
          <Typography noWrap variant="h5" pr={2.5}>
            {music.name}
          </Typography>
          <Typography noWrap variant="body1" color="text.secondary" pr={2.5}>
            {music.ownerName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SingleMusicBox
