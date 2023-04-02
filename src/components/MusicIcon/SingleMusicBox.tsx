import { Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import LongMenu from '@/components/MusicIcon/LongMenu'
import { setPlaylistsAtom, Music } from '@/stores/musicPlayerStore'
import { useAtom } from 'jotai'
import Link from 'next/link'
interface Props {
  music: Music
}

const SingleMusicBox = ({ music }: Props) => {
  const [, setPlaylists] = useAtom(setPlaylistsAtom)
  const playMusic = () => {
    setPlaylists([music], {})
  }
  const [nameColor, setNameColor] = useState('text.secondary')

  return (
    <Box
      px={'6%'}
      py={'5%'}
      pb={'20%'}
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
      sx={{
        borderRadius: '4px',
        bgcolor: 'container.light',
        cursor: 'pointer',
      }}
      onClick={playMusic}
    >
      <Stack spacing={3} justifyContent={'center'}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
          }}
        >
          <Image
            src={music.coverImage}
            fill
            style={{
              borderRadius: '4px',
            }}
            alt="music-cover-image"
          />
        </Box>
        <Stack spacing={0.5} position="relative">
          <Box
            position="absolute"
            top={0}
            right={0}
            onClick={(e) => e.stopPropagation()}
          >
            <LongMenu musicID={music.musicId} />
          </Box>
          <Typography noWrap variant="h5" pr={2.5}>
            {music.name}
          </Typography>
          <Link
            href={`/users/${music.ownerId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              noWrap
              variant="body1"
              color={nameColor}
              pr={2.5}
              onMouseOver={() => {
                setNameColor('container.main')
              }}
              onMouseOut={() => {
                setNameColor('text.secondary')
              }}
              // onClick={() => {
              //   router.push('/profile/${music.ownerId}')
              // }}
            >
              {music.ownerName}
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SingleMusicBox
