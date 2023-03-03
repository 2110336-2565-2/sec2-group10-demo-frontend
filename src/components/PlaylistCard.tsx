import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'

interface Props {
  id: string
  image: string
  playlistName: string
  description: string
}
const PlaylistCard = (props: Props) => {
  return (
    <Box
      px={'6%'}
      py={'5%'}
      pb={'20%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      sx={{
        borderRadius: '4px',
        // aspectRatio: '2 / 3',
        bgcolor: 'container.light',
      }}
      onClick={() =>
        //Todo: change to clicked playlist page
        console.log('click')
      }
    >
      <Stack spacing={3} justifyContent={'center'}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image
            src={props.image}
            fill
            style={{
              borderRadius: '4px',
            }}
            // width={174}
            // height={190}
            alt="mock image"
          />
        </Box>
        <Stack spacing={0.5}>
          <Typography noWrap variant="h5">
            {props.playlistName}
          </Typography>
          <Typography noWrap variant="body1" color="text.secondary">
            {props.description}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PlaylistCard
