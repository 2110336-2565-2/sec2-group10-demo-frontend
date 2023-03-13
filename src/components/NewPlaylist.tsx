import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import AddPlaylistLogo from '@/assets/addplaylist-icon.svg'
import { createPlaylist } from '@/queries/usePlaylist'
import { useRouter } from 'next/router'
import { DEFAULT_COVER_IMAGE } from '@/constants'

const NewPlaylist = () => {
  const router = useRouter()

  const handleCreatePlaylist = async () => {
    const defaultItem = {
      name: 'MyPlaylist',
      coverImage: DEFAULT_COVER_IMAGE,
    }
    const newItem = await createPlaylist(defaultItem)
    console.log('create New', newItem)
    router.push(`/playlists/${newItem._id}`)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="container.light"
      borderRadius="4px"
      py={'10%'}
      width={'100%'}
      height={'100%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      onClick={handleCreatePlaylist}
      sx={{
        cursor: 'pointer',
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
