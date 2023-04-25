import SingleMusicBox from '@/components/MusicIcon/SingleMusicBox'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { getRandomMusic, useRandomMusic } from '@/queries/useRandomMusics'
import { useSetAtom } from 'jotai'
import { setPlaylistsAtom } from '@/stores/musicPlayerStore'

const TestHome = () => {
  const setPlaylists = useSetAtom(setPlaylistsAtom)
  const randomMusics = useRandomMusic()

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Made For You</Typography>
      <Grid container spacing={3}>
        {randomMusics.data?.map((randomMusic) => (
          <Grid key={randomMusic.musicId} {...{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <SingleMusicBox
              music={randomMusic}
              onClick={async () => {
                const otherMusics = await getRandomMusic(24)
                setPlaylists([randomMusic, ...otherMusics], {})
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default TestHome
