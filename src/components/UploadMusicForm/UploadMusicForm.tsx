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
          width: '470px',
          margin: 'auto',
        }}
      >
        <Stack spacing={3.5}>
          <Typography variant="h1" align="center">
            Upload Music
          </Typography>
          <Stack spacing={2.5}>
            <Box
              sx={{
                width: '190px',
                height: '168px',
                backgroundColor: 'white',
                margin: 'auto',
              }}
            />
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Music Name*</Typography>
              <TextField
                variant="outlined"
                placeholder="Music Name"
                color="primary"
                inputProps={{ style: { height: '16px', padding: '8px 12px' } }}
                {...register('musicName')}
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Select Album*</Typography>
              <TextField
                variant="outlined"
                placeholder="Add an Album"
                inputProps={{ style: { height: '16px', padding: '8px 12px' } }}
                {...register('albumName')}
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Upload Music*</Typography>
              <Button variant="contained" text="Upload" color="secondary" />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            text="Submit"
            onClick={handleSubmit(uploadMusic)}
          />
        </Stack>
      </Box>
    </Container>
  )
}
export default UploadMusicForm
