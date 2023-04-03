import { DEFAULT_COVER_IMAGE } from '@/constants'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  image: string
  artistName: string
}
const ArtistCard = (props: Props) => {
  const coverImage = props.image ? props.image : DEFAULT_COVER_IMAGE

  return (
    <Link
      href={`/profile/${props.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
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
              alt="mock-image"
            />
          </Box>
          <Stack spacing={0.5}>
            <Typography noWrap variant="h5" alignItems="center">
              {props.artistName}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Link>
  )
}

export default ArtistCard
