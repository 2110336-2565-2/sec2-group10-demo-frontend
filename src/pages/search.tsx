import ArtistCard from '@/components/ArtistCard'
import SingleMusicBox from '@/components/MusicIcon/SingleMusicBox'
import PlaylistCard from '@/components/Playlist/PlaylistCard'
import SearchBar from '@/components/SearchBar'
import { getRandomMusic } from '@/queries/useRandomMusics'
import {
  useArtistSearch,
  useMusicSearch,
  usePlaylistSearch,
} from '@/queries/useSearch'
import { setPlaylistsAtom } from '@/stores/musicPlayerStore'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'

interface SearchFieldValues {
  search: string
}

const Search = () => {
  const setPlaylists = useSetAtom(setPlaylistsAtom)
  const { control, watch } = useForm<SearchFieldValues>({
    defaultValues: {
      search: '',
    },
  })
  const searchString = watch('search')

  const musics = useMusicSearch(searchString)
  const playlists = usePlaylistSearch(searchString)
  const artists = useArtistSearch(searchString)

  const hasMusics = !!musics.data?.length
  const hasPlaylists = !!playlists.data?.length
  const hasArtists = !!artists.data?.length

  return (
    <Stack spacing={3.5} sx={{ margin: '40px 5%' }}>
      <SearchBar control={control} name="search" />
      {hasMusics && (
        <Stack spacing={1.5}>
          <Typography variant="h2">Music</Typography>
          <Grid container spacing={3}>
            {musics.data?.map((music) => (
              <Grid
                key={music.musicId}
                {...{ xs: 2.4, sm: 2.4, md: 2.4, lg: 2.4 }}
              >
                <SingleMusicBox
                  music={music}
                  onClick={async () => {
                    const otherMusics = await getRandomMusic(24)
                    setPlaylists([music, ...otherMusics], {})
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      {hasPlaylists && (
        <Stack spacing={1.5}>
          <Typography variant="h2">Playlists</Typography>
          <Grid container spacing={3}>
            {playlists.data?.map((playlist) => (
              <Grid
                key={playlist._id}
                {...{ xs: 2.4, sm: 2.4, md: 2.4, lg: 2.4 }}
              >
                <PlaylistCard
                  id={playlist._id}
                  playlistName={playlist.name}
                  creatorName={playlist.creatorName}
                  image={playlist.coverImage}
                  isAlbum={playlist.isAlbum}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      {hasArtists && (
        <Stack spacing={1.5}>
          <Typography variant="h2">Artists</Typography>
          <Grid container spacing={3}>
            {artists.data?.map((artist) => (
              <Grid
                key={artist._id}
                {...{ xs: 2.4, sm: 2.4, md: 2.4, lg: 2.4 }}
              >
                <ArtistCard
                  id={artist._id}
                  artistName={artist.username}
                  image={artist.profileImage}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  )
}

export default Search
