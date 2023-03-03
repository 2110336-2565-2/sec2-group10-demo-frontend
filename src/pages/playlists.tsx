import NewPlaylist from '@/components/NewPlaylist'
import PlaylistCard from '@/components/PlaylistCard'
import { usePlaylists } from '@/queries/usePlaylist'
import Grid from '@mui/material/Unstable_Grid2'

const Playlist = () => {
  const playlists = usePlaylists()
  console.log(playlists)

  return (
    <>
      <Grid container spacing={3}>
        {playlists?.map((playlist, i) => {
          return (
            <Grid key={i} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <PlaylistCard
                id={playlist._id}
                playlistName={playlist.name}
                description={playlist.description}
                image={playlist.coverImage}
              />
            </Grid>
          )
        })}
        <Grid key={'newplaylist'} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <NewPlaylist />
        </Grid>
      </Grid>
    </>
  )
}

export default Playlist
