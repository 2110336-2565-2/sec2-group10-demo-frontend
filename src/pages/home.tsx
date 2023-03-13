import SingleMusicBox from '@/components/MusicIcon/SingleMusicBox'
import MusicPlayer from '@/components/MusicPlayer'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useRandomMusic } from '@/queries/useRandomMusics'

const TestHome = () => {
  const randomMusics = useRandomMusic()

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Made For You</Typography>
      <Grid container spacing={3}>
        {randomMusics?.map((randomMusic) => (
          <Grid key={randomMusic.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <SingleMusicBox
              music={{
                id: randomMusic.musicId,
                title: randomMusic.name,
                artist: randomMusic.ownerName,
                album: randomMusic.albumName,
                source: randomMusic.url,
                coverImage: randomMusic.coverImage,
                length: randomMusic.duration,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <MusicPlayer />
    </Stack>
  )
}

export default TestHome
