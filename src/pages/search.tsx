import SearchBar from '@/components/SearchBar'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

interface SearchFieldValues {
  search: string
}

const Search = () => {
  const { control } = useForm<SearchFieldValues>({
    defaultValues: {
      search: '',
    },
  })

  return (
    <Stack>
      <SearchBar control={control} name="search" />
    </Stack>
  )
}

export default Search
