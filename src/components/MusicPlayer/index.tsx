import { Box, Stack, Typography } from '@mui/material'

import {
  autoPlayAtom,
  musicAtom,
  skipNextAtom,
  skipPreviousAtom,
  volumeAtom,
} from '@/stores/musicPlayerStore'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'

import MusicControl from './MusicControl'
import MusicTimeLine from './MusicTimeLine'
import SoundControl from './SoundControl'
import { useSound } from '@/hooks/useSound'

const MusicPlayer = () => {
  const volume = useAtomValue(volumeAtom)
  const music = useAtomValue(musicAtom)
  const [, skipNext] = useAtom(skipNextAtom)
  const [, skipPrevious] = useAtom(skipPreviousAtom)
  const [autoPlay, setAutoPlay] = useAtom(autoPlayAtom)
  const musicSource = music?.source || (null as unknown as string)
  const [play, { pause, duration, sound, stop }] = useSound(musicSource, {
    volume: volume / 100,
    onend: () => {
      skipNext(true)
    },
  })

  useEffect(() => {
    if (sound) {
      sound.volume(volume / 100)
    }
    return () => {
      sound?.unload()
    }
  }, [sound])

  useEffect(() => {
    if (autoPlay) {
      play()
      setAutoPlay(false)
    }
  }, [sound])

  const handleSkipNext = () => {
    if (!sound) return
    skipNext(sound.playing())
    stop()
  }

  const handleSkipPrevious = () => {
    if (!sound) return
    if (sound.seek() > 3) {
      // restart current song if seeked more than 3 seconds
      sound.seek(0)
      return
    }

    skipPrevious(sound.playing())
    stop()
  }

  return (
    <Box py={2} px={4} bgcolor="container.main" borderRadius={'24px'}>
      <Stack spacing={2}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack
            spacing={0.5}
            flex={1}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
          >
            <Typography variant="h4" noWrap>
              {music?.name}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {music?.artist}
            </Typography>
          </Stack>
          <MusicControl
            sound={sound}
            onPlay={() => play()}
            onPause={() => pause()}
            onSkipNext={handleSkipNext}
            onSkipPrevious={handleSkipPrevious}
          />
          <SoundControl />
        </Stack>
        <MusicTimeLine sound={sound} duration={(duration || 0) / 1000} />
      </Stack>
    </Box>
  )
}

export default MusicPlayer
