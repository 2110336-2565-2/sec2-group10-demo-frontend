import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'

interface Props {
  id: string
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
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      sx={{
        borderRadius: '4px',
        bgcolor: 'container.light',
      }}
      onClick={() =>
        //Todo: change to clicked playlist page
        console.log('click')
      }
    >
      <Stack spacing={1} justifyContent={'center'}>
        <Image
          src={props.image}
          style={{
            borderRadius: '4px',
          }}
          width={174}
          height={190}
          alt="mock image"
        />
        <Stack spacing={0.5}>
          <Typography variant="subtitle1">{props.playlistName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {props.creatorName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Playlist
