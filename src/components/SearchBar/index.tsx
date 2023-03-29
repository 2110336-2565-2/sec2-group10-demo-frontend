import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface SearchBarProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
}

const SearchBar = <T extends FieldValues>({
  name,
  control,
}: SearchBarProps<T>) => {
  const theme = useTheme()
  const { field } = useController({ name, control })
  const [value, setValue] = useState('')

  useEffect(() => {
    field.onChange(value)
  }, [value])

  const clearValue = () => {
    setValue('')
  }

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      placeholder="What do you want to listen to?"
      inputProps={{
        style: {
          padding: '8px 0px',
        },
      }}
      InputProps={{
        sx: {
          color: '#000',
          fontSize: theme.typography.h4.fontSize,
          fontWeight: theme.typography.h4.fontWeight,
          backgroundColor: '#fff !important',
          borderRadius: '40px !important',
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: '#000', fontSize: '42px' }} />
          </InputAdornment>
        ),
        endAdornment: value && (
          <IconButton onClick={clearValue}>
            <ClearRoundedIcon sx={{ color: '#000', fontSize: '28px' }} />
          </IconButton>
        ),
      }}
      fullWidth
    />
  )
}

export default SearchBar
