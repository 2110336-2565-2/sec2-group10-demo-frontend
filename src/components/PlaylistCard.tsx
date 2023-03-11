import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  image: string
  playlistName: string
  creatorName: string
}
const PlaylistCard = (props: Props) => {
  const coverImage = props.image
    ? props.image
    : 'https://i.ibb.co/k61nhmb/playlist-default-image.jpg'
  const creatorName = props.creatorName ? props.creatorName : 'Anonymous'

  return (
    <Link
      href={`/playlists/${props.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        px={'4%'}
        py={'4%'}
        pb={'16%'}
        boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
        sx={{
          borderRadius: '4px',
          // aspectRatio: '2 / 3',
          bgcolor: 'container.light',
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
              src={coverImage}
              fill
              style={{
                borderRadius: '4px',
              }}
              alt="mock image"
            />
          </Box>
          <Stack spacing={0.5}>
            <Typography noWrap variant="h5" alignItems="center">
              {props.playlistName}
            </Typography>
            <Typography noWrap variant="body1" color="text.secondary">
              {creatorName}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Link>
  )
}

export default PlaylistCard
