import UploadMusicForm from '@/components/UploadMusicForm/UploadMusicForm'
import { Stack } from '@mui/material'

const UploadMusic = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <UploadMusicForm />
    </Stack>
  )
}

export default UploadMusic
