import SearchBar from '@/components/SearchBar'
import {
  useArtistSearch,
  useMusicSearch,
  usePlaylistSearch,
} from '@/queries/useSearch'
import { Stack } from '@mui/material'
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
    <Stack>
      <SearchBar control={control} name="search" />
    </Stack>
  )
}

export default Search
