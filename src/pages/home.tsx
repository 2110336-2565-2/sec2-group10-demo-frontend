import Button from '@/components/Button'
import MusicPlayer from '@/components/MusicPlayer'
import { setPlaylistsAtom } from '@/stores/musicPlayerStore'
import { Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'

const music = {
  id: '1',
  title: 'ความคิดถึงที่ส่งไปไม่ถึง',
  artist: 'Paper Planes',
  album: 'Hers',
  length: 120,
  coverImage: 'https://picsum.photos/200/300',
  source:
    'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/05+%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%96%E0%B8%B6%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%96%E0%B8%B6%E0%B8%87.m4a',
}

const playList = [
  {
    id: '2',
    title: 'เสแสร้ง (Pretend) [feat. Moon]',
    artist: 'Paper Planes',
    album: 'Hers',
    length: 120,
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/01+%E0%B9%80%E0%B8%AA%E0%B9%81%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%87+(Pretend)+%5Bfeat.+Moon%5D+-+Paper+Planes.mp3',
  },
  {
    id: '3',
    title: 'ซ้ำซ้ำ',
    artist: 'Paper Planes',
    album: 'Hers',
    length: 120,
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/02+%E0%B8%8B%E0%B9%89%E0%B8%B3%E0%B8%8B%E0%B9%89%E0%B8%B3.m4a',
  },
]

const Home = () => {
  const [, setPlaylists] = useAtom(setPlaylistsAtom)
  return (
    <Stack height={'100%'} justifyContent="space-between">
      <Stack spacing={3}>
        <Typography variant="h2">Music</Typography>
        <Stack direction={'row'} justifyContent="space-around">
          <Typography variant="h4">{music.title}</Typography>
          <Typography variant="h4">{music.artist}</Typography>
          <Button
            text="play song"
            variant="contained"
            onClick={() => setPlaylists([music], {})}
          />
        </Stack>
        <Stack>
          <Stack direction={'row'} spacing={3}>
            <Typography variant="h2">Playlists</Typography>
            <Button
              text="play Playlist"
              variant="contained"
              onClick={() => setPlaylists(playList, {})}
            />
          </Stack>
          {playList.map((music, index) => (
            <Stack key={index} direction={'row'} spacing={2} pl={3}>
              <Typography variant="h4">{music.title}</Typography>
              <Typography variant="h4">{music.artist}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <MusicPlayer />
    </Stack>
  )
}

export default Home
