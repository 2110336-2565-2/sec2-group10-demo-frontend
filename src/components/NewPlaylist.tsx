import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import AddPlaylistLogo from '@/assets/addplaylist-icon.svg'
const MusicStyling = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'container.light',
  width: '190px',
  height: '266px',
  padding: '8px',
  gap: '8px',
  boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.5)',
  borderRadius: '4px',
}

const NewPlaylist = () => {
  return (
    <Box
      sx={{
        ...MusicStyling,
      }}
      onClick={() => {
        // TODO: initial playlist untitled
        console.log('click')
      }}
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
    </Box>
  )
}

export default NewPlaylist
