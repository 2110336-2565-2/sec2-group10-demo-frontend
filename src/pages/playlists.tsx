import NewPlaylistCard from '@/components/Playlist/NewPlaylistCard'
import PlaylistCard from '@/components/Playlist/PlaylistCard'
import { usePlaylists } from '@/queries/usePlaylist'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const Playlist = () => {
  const playlists = usePlaylists()

  return (
    <Stack spacing={4} height={'100%'}>
      <Typography noWrap variant="h1" align="center">
        PLAYLISTS
      </Typography>
      <Grid container spacing={3}>
        {playlists.data?.map((playlist) => {
          return (
            <Grid key={playlist._id} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <PlaylistCard
                id={playlist._id}
                playlistName={playlist.name}
                creatorName={playlist.creatorName}
                image={playlist.coverImage}
                isAlbum={playlist.isAlbum}
              />
            </Grid>
          )
        })}
        <Grid key={'newplaylist'} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <NewPlaylistCard />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Playlist
