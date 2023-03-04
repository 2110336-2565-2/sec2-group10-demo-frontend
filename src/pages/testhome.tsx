import SingleMusicBox from '@/components/MusicIcon/SingleMusicBox'
import MusicPlayer from '@/components/MusicPlayer'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const music1 = {
  musicId: '1d3q',
  name: 'ความคิดถึงที่ส่งไปไม่ถึง',
  artist: 'Paper Planes',
  coverImage: 'https://picsum.photos/200/300',
  source:
    'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/05+%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%96%E0%B8%B6%E0%B8%87.m4a',
}

const music2 = {
  musicId: '1d3gs',
  name: 'ซ้ำซ้ำ',
  artist: 'Paper Planes',
  coverImage: 'https://picsum.photos/200/300',
  source:
    'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/02+%E0%B8%8B%E0%B9%89%E0%B8%B3%E0%B8%8B%E0%B9%89%E0%B8%B3.m4a',
}

const TestHome = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h1">Made For You</Typography>
      <Grid container spacing={3}>
        <Grid key={music1.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music1} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
        <Grid key={music2.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <SingleMusicBox music={music2} />
        </Grid>
      </Grid>

      <MusicPlayer />
    </Stack>
  )
}

export default TestHome
