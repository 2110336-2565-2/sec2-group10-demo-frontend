import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import AddPlaylistLogo from '@/assets/addplaylist-icon.svg'

const NewPlaylist = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      columnGap={1.5}
      width="190px"
      height="266px"
      borderRadius="4px"
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
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
