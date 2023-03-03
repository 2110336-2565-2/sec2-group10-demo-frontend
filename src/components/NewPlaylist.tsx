import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import AddPlaylistLogo from '@/assets/addplaylist-icon.svg'

const NewPlaylist = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="container.light"
      borderRadius="4px"
      px={'6%'}
      py={'10%'}
      pb={'20%'}
      width={'100%'}
      height={'100%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      onClick={() => {
        // TODO: initial playlist untitled
        console.log('click')
      }}
    >
      <Stack spacing={3.5} alignItems="center" width="100%">
        <Box
          sx={{
            width: '70%',
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image src={AddPlaylistLogo} fill alt="addplaylist-icon" />
        </Box>
        <Typography variant="h5" align="center" sx={{ color: 'text.primary' }}>
          Add a new playlist
        </Typography>
      </Stack>
    </Box>
  )
}

export default NewPlaylist
