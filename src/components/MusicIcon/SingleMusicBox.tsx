import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import LongMenu from '@/components/MusicIcon/LongMenu'
import { setPlaylistsAtom } from '@/stores/musicPlayerStore'
import { useAtom } from 'jotai'

interface Props {
  music: any
}

const SingleMusicBox = ({ music }: Props) => {
  const [, setPlaylists] = useAtom(setPlaylistsAtom)
  const MusicHandler = () => {
    setPlaylists([music], {})
  }

  return (
    <Box
      px={'6%'}
      py={'5%'}
      pb={'20%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      sx={{
        borderRadius: '4px',
        position: 'relative',
        bgcolor: 'container.light',
        zIndex: 'relative',
      }}
      style={{ zIndex: 1 }}
      onClick={() => {
        MusicHandler()
      }}
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
            alt="mock image"
          />
        </Box>
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography noWrap variant="h5">
              {music.name}
            </Typography>
            <Box style={{ zIndex: 2 }} sx={{ zIndex: 'absolute' }}>
              <LongMenu />
            </Box>
          </Stack>
          <Typography noWrap variant="body1" color="text.secondary">
            {music.artist}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SingleMusicBox
