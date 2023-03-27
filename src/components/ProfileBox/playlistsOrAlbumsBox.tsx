import { useProfileDisplayPlaylistsOrAlbums } from '@/queries/useProfileDisplayPlaylistsOrAlbums'
import PlaylistCard from '@/components/PlaylistCard'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const PlaylistProfile = () => {
  const playlists = useProfileDisplayPlaylistsOrAlbums()

  return (
    <Stack
      spacing={4}
      height={'100%'}
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
      </Grid>
    </Stack>
  )
}

export default PlaylistProfile
