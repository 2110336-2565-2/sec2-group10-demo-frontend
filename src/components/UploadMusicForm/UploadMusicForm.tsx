import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'

const MusicSchema = z.object({
  musicName: z.string(),
  albumName: z.string(),
})

type Music = z.infer<typeof MusicSchema>

const UploadMusicForm = () => {
  const { register, handleSubmit } = useForm<Music>({
    resolver: zodResolver(MusicSchema),
    mode: 'onSubmit',
  })

  const uploadMusic = async (data: Music) => {
    //TODO: login user api
    console.log(data)
  }

  return (
    <Container maxWidth="sm">
      <Box
        p={5}
        sx={{
          borderRadius: '24px',
          bgcolor: 'container.main',
        }}
      >
        <Stack spacing={'27px'}>
          <Typography variant="h1" align="center">
            Upload Music
          </Typography>
          <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{ width: '190px', height: '168px', backgroundColor: 'white' }}
            />
            <Stack spacing={0.5} sx={{ width: '390px' }}>
              <Typography variant="subtitle1">Music Name*</Typography>
              <TextField
                variant="outlined"
                placeholder="Music Name"
                {...register('musicName')}
              />
            </Stack>
            <Stack spacing={0.5} sx={{ width: '390px' }}>
              <Typography variant="subtitle1">Select Album*</Typography>
              <TextField
                variant="outlined"
                type="password"
                placeholder="Add an Album"
                {...register('albumName')}
              />
            </Stack>
            <Stack spacing={0.5} sx={{ width: '390px' }}>
              <Typography variant="subtitle1">Select Album*</Typography>
              <Button variant="contained" text="Upload" color="secondary" />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{ width: '100px', height: '50px' }}
            onClick={handleSubmit(uploadMusic)}
          >
            <Typography variant="h6">Submit</Typography>
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}
export default UploadMusicForm
