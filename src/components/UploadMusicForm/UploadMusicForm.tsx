import { DEFAULT_COVER_IMAGE } from '@/constants'
import { useAlbums } from '@/queries/useAlbum'
import { useGenre } from '@/queries/useGenre'
import { http } from '@/services/apiAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  alpha,
  Box,
  Container,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'
import EditableImage from '../EditableImage'

const MusicSchema = z.object({
  musicName: z.string().min(1),
  albumId: z.string().min(1),
  musicCover: z.custom<File>((v) => v instanceof File),
  musicFile: z.custom<File>((v) => v instanceof File),
  genre: z.string().min(1),
})

type Music = z.infer<typeof MusicSchema>

const UploadMusicForm = () => {
  const router = useRouter()
  const { register, handleSubmit, control, formState } = useForm<Music>({
    resolver: zodResolver(MusicSchema),
    mode: 'onSubmit',
  })

  const uploadMusic = async (data: Music) => {
    //TODO: login user api
    if (data.musicCover != undefined && data.musicFile != undefined) {
      const formData = new FormData()
      formData.append('name', data.musicName)
      formData.append('description', 'this is sound of dek wat')
      formData.append('albumId', data.albumId)
      formData.append('music', data.musicFile)
      formData.append('coverImage', data.musicCover)
      formData.append('genre', data.genre)
      await http.post('users/musics', formData)
      router.push(`/playlists/${data.albumId}`)
    }
  }

  const musicFileRef = useRef<HTMLInputElement | null>(null)
  const { field: field } = useController({
    name: 'musicFile',
    control: control,
  })

  const albumList = useAlbums()
  const genreList = useGenre()

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
                alwaysVisible
              />
              {!!formState.errors.musicCover ? (
                <FormHelperText error>Please upload music cover</FormHelperText>
              ) : null}
            </Box>

            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Add a Music Name*</Typography>
              <TextField
                variant="outlined"
                placeholder="Music Name"
                inputProps={{ style: { height: '16px', padding: '8px 12px' } }}
                error={!!formState.errors.musicName}
                {...register('musicName')}
              />
              {!!formState.errors.musicName ? (
                <FormHelperText error>Please fill a music name</FormHelperText>
              ) : null}
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Add an Album*</Typography>
              <Select
                variant="outlined"
                placeholder="Add an Album"
                sx={{ height: '32px', backgroundColor: alpha('#FFFFFF', 0.16) }}
                error={!!formState.errors.albumId}
                {...register('albumId')}
              >
                {albumList.data?.map((value, index) => {
                  return (
                    <MenuItem value={value._id} key={index}>
                      {value.name}
                    </MenuItem>
                  )
                })}
              </Select>
              {!!formState.errors.albumId ? (
                <FormHelperText error>
                  Please select target album
                </FormHelperText>
              ) : null}
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Select genre*</Typography>
              <Select
                variant="outlined"
                placeholder="select genre"
                sx={{ height: '32px', backgroundColor: alpha('#FFFFFF', 0.16) }}
                error={!!formState.errors.genre}
                {...register('genre')}
              >
                {genreList.data?.map((value, index) => {
                  return (
                    <MenuItem value={value} key={index}>
                      {value}
                    </MenuItem>
                  )
                })}
              </Select>
              {!!formState.errors.genre ? (
                <FormHelperText error>Please select genre</FormHelperText>
              ) : null}
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
                required
                style={{ display: 'none' }}
              />
              {!!formState.errors.musicFile ? (
                <FormHelperText error>Please upload music</FormHelperText>
              ) : null}
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
