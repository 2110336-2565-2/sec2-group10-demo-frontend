import SingleMusicBox from '@/components/MusicIcon/SingleMusicBox'
import PlaylistCard from '@/components/PlaylistCard'
import SearchBar from '@/components/SearchBar'
import {
  useArtistSearch,
  useMusicSearch,
  usePlaylistSearch,
} from '@/queries/useSearch'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'

interface SearchFieldValues {
  search: string
}

const Search = () => {
  const { control, watch } = useForm<SearchFieldValues>({
    defaultValues: {
      search: '',
    },
  })
  const searchString = watch('search')

  const musics = useMusicSearch(searchString)
  const playlists = usePlaylistSearch(searchString)
  const artists = useArtistSearch(searchString)

  console.log('musics', musics.data)
  console.log('playlists', playlists.data)
  console.log('artists', artists.data)

  return (
    <Stack spacing={3.5} sx={{ margin: '84px 82px' }}>
      <SearchBar control={control} name="search" />
      <Stack spacing={1.5}>
        <Typography variant="h2"> Music</Typography>
        <Grid container spacing={3}>
          {musics.data?.map((music) => (
            <Grid
              key={music.musicId}
              {...{ xs: 2.4, sm: 2.4, md: 2.4, lg: 2.4 }}
            >
              <SingleMusicBox music={music} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack spacing={1.5}>
        <Typography variant="h2"> Playlists</Typography>
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
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default Search
