import AddPlaylistIcon from '@/assets/addplaylist-icon.svg'
import { createPlaylist } from '@/queries/usePlaylist'
import { randomString } from '@/utils'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NewPlaylist = () => {
  const router = useRouter()

  const handleCreatePlaylist = async () => {
    const defaultItem = {
      name: 'MyPlaylist' + randomString(5),
      isAlbum: false,
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
      py={'10%'}
      width={'335px'}
      height={'444px'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      onClick={handleCreatePlaylist}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Stack spacing={5} alignItems="center" width="100%">
        <Typography variant="h2" align="center" sx={{ color: 'text.primary' }}>
          Playlist
        </Typography>
        <Box
          sx={{
            width: '160px',
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image src={AddPlaylistIcon} fill alt="addplaylist-icon" />
        </Box>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: 'text.primary' }}
        >
          List of play music
        </Typography>
      </Stack>
    </Box>
  )
}

export default NewPlaylist
