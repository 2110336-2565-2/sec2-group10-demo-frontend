import { useProfileDisplayPlaylistsOrAlbums } from '@/queries/useProfileDisplayPlaylistsOrAlbums'
import PlaylistCard from '@/components/PlaylistCard'
import { Stack, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

interface PlaylistProfileResponse {
  userId: string
  role: string
}

const PlaylistProfile = ({ userId, role }: PlaylistProfileResponse) => {
  const playlists = useProfileDisplayPlaylistsOrAlbums({ userId, role })

  return (
    <Stack
      spacing={4}
      height={'100%'}
      width={'100vw'}
      sx={{ p: 1.5, bgcolor: 'container.light' }}
    >
      <Grid container spacing={3}>
        {playlists?.map((playlist) => {
          return (
            <Grid key={playlist._id} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <PlaylistCard
                id={playlist._id}
                playlistName={playlist.name}
                creatorName={playlist.creatorName}
                image={playlist.coverImage}
              />
            </Grid>
          )
        })}
        <Grid>
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
          ></Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PlaylistProfile
