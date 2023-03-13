import { DEFAULT_COVER_IMAGE } from '@/constants'
import { useAlbums } from '@/queries/useAlbum'
import { http } from '@/services/apiAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  alpha,
  Box,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRef } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import EditableImage from '../EditableImage'

const MusicSchema = z.object({
  musicName: z.string().min(1),
  albumId: z.string().min(1),
  musicCover: z.any(),
  musicFile: z.any(),
})

type Music = z.infer<typeof MusicSchema>

const UploadMusicForm = () => {
  const { register, handleSubmit, control } = useForm<Music>({
    resolver: zodResolver(MusicSchema),
    mode: 'onSubmit',
  })

  const uploadMusic = async (data: Music) => {
    //TODO: login user api
    console.log(data)
    if (data.musicCover != undefined && data.musicFile != undefined) {
      const formData = new FormData()
      formData.append('name', data.musicName)
      formData.append('description', 'this is sound of dek wat')
      formData.append('albumId', data.albumId)
      formData.append('music', data.musicFile)
      formData.append('coverImage', data.musicCover)
      await http.post('users/musics', formData)
    }
  }

  const musicFileRef = useRef<HTMLInputElement | null>(null)
  const { field: field } = useController({
    name: 'musicFile',
    control: control,
  })

  const albumList = useAlbums()

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
                margin: 'auto',
              }}
            >
              <EditableImage
                src={DEFAULT_COVER_IMAGE}
                alt="playlist-cover-image"
                width={190}
                height={168}
                name="musicCover"
                control={control}
              />
            </Box>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Add a Music Name*</Typography>
              <TextField
                variant="outlined"
                placeholder="Music Name"
                inputProps={{ style: { height: '16px', padding: '8px 12px' } }}
                {...register('musicName')}
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Add an Album*</Typography>
              <Select
                variant="outlined"
                placeholder="Add an Album"
                sx={{ height: '32px', backgroundColor: alpha('#FFFFFF', 0.16) }}
                {...register('albumId')}
              >
                {albumList?.map((value, index) => {
                  console.log(value)
                  return (
                    <MenuItem value={value._id} key={index}>
                      {value.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Upload Music*</Typography>
              <input
                type="file"
                accept=".mp3, audio/*"
                ref={(r) => {
                  musicFileRef.current = r
                  field.ref(r)
                }}
                onChange={(e) => {
                  if (e.target.files) {
                    field.onChange(e.target.files[0])
                  }
                }}
                style={{ display: 'none' }}
              />
              <Typography variant="caption">
                {musicFileRef.current?.value.split('\\').pop()}
              </Typography>
              <Button
                variant="contained"
                text="Upload"
                sx={{ backgroundColor: 'secondary.dark' }}
                onClick={() => {
                  musicFileRef.current?.click()
                }}
              />
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
