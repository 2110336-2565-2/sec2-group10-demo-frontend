import AddAlbumIcon from '@/assets/addalbum-icon.svg'
import { createPlaylist } from '@/queries/usePlaylist'
import { useRoleProfile } from '@/queries/useProfile'
import { randomString } from '@/utils'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NewAlbum = () => {
  const router = useRouter()
  const userRole = useRoleProfile()
  const isArtist = userRole.data?.includes('artist')

  const cursorType = isArtist ? 'pointer' : 'default'
  const bgColor = isArtist ? 'container.light' : 'container.dark'

  const handleCreateAlbum = async () => {
    if (isArtist) {
      const defaultItem = {
        name: 'MyAlbum' + randomString(5),
        isAlbum: true,
      }
      const newItem = await createPlaylist(defaultItem)
      console.log('create New', newItem)
      router.push(`/playlists/${newItem._id}`)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={bgColor}
      py={'10%'}
      width={'335px'}
      height={'444px'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      onClick={handleCreateAlbum}
      sx={{
        cursor: cursorType,
      }}
    >
      <Stack spacing={5} alignItems="center" width="100%">
        <Typography variant="h2" align="center" sx={{ color: 'text.primary' }}>
          Album
        </Typography>
        <Box
          sx={{
            width: '160px',
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image src={AddAlbumIcon} fill alt="addplaylist-icon" />
        </Box>
        <Stack spacing={2} direction={'column'} width="100%">
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: 'text.primary' }}
          >
            For upload your music
          </Typography>
          {isArtist ? (
            ''
          ) : (
            <>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ color: 'warning.main' }}
              >
                Only Artist can create an album
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default NewAlbum
