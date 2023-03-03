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
              src={
                props.image
                  ? props.image
                  : 'https://media3.giphy.com/media/3MC2ZFkYPmx8c/200w.webp?cid=ecf05e4772tut4l5xknorgs0vw1u0x4clda9wuqyx3jmmzpn&rid=200w.webp&ct=g'
              }
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
              {props.creatorName ? props.creatorName : 'Anonymous'}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Link>
  )
}

export default PlaylistCard
