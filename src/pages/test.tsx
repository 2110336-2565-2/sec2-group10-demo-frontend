import Button from '@/components/Button'
import MusicPlayer from '@/components/MusicPlayer'
import { setPlaylistsAtom } from '@/stores/musicPlayerStore'
import { Stack } from '@mui/material'
import { useAtom } from 'jotai'

const music = {
  name: 'ความคิดถึงที่ส่งไปไม่ถึง',
  artist: 'Paper Planes',
  coverImage: 'https://picsum.photos/200/300',
  source:
    'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/05+%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%96%E0%B8%B6%E0%B8%87.m4a',
}

const Test = () => {
  const [, setPlaylists] = useAtom(setPlaylistsAtom)
  return (
    <Stack height={'100vh'} justifyContent="end">
      <Button
        text="play song"
        variant="contained"
        onClick={() => setPlaylists([music], true)}
      />
      <MusicPlayer />
    </Stack>
  )
}

export default Test
