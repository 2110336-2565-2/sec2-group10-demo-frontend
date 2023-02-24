import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'

interface Props {
  image: string
  playlistName: string
  creatorName: string
}
const Playlist = (props: Props) => {
  return (
    <Box
      px={1}
      py={1}
      width={190}
      height={266}
      sx={{
        borderRadius: '4px',
        bgcolor: 'container.main',
      }}
    >
      <Stack spacing={1} justifyContent={'center'}>
        <Image src={props.image} width={174} height={190} alt="mock image" />
        <Stack spacing={0.5}>
          <Typography variant="subtitle1">{props.playlistName}</Typography>
          <Typography variant="subtitle2">{props.creatorName}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Playlist
