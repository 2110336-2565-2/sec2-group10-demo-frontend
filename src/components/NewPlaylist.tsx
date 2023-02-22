import Image from 'next/image'
import { Button, Stack, Typography } from '@mui/material'
import AddPlaylistLogo from '@/assets/addplaylist-icon.svg'
import Link from 'next/link'
const MusicStyling = {
  justifyContent: 'center',
  color: 'container.main',
  width: '190px',
  height: '266px',
  padding: '8px',
  gap: '8px',
  boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.5)',
  borderRadius: '4px',
}

const NewPlaylist = () => {
  return (
    <Button
      sx={{
        ...MusicStyling,
      }}
      LinkComponent={Link}
    >
      <Stack spacing={3.5} alignContent="center">
        <Image
          src={AddPlaylistLogo}
          alt="addplaylist-icon"
          width={120}
          height={120}
        />
        <Typography variant="caption" sx={{ color: 'text.primary' }}>
          Add a new playlist
        </Typography>
      </Stack>
    </Button>
  )
}

export default NewPlaylist
