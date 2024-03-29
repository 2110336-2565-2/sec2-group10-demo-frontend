import { Box, Stack, Typography } from '@mui/material'

import {
  autoPlayAtom,
  isPlayAdsAtom,
  musicAtom,
  skipNextAtom,
  skipPreviousAtom,
  volumeAtom,
} from '@/stores/musicPlayerStore'
import { useAtom, useAtomValue } from 'jotai'
import { memo, useEffect } from 'react'

import MusicControl from './MusicControl'
import MusicTimeLine from './MusicTimeLine'
import SoundControl from './SoundControl'
import { useSound } from '@/hooks/useSound'
import { useShow } from '@/hooks/useShow'
import FullSizeContent from './FullSizeContent'
import { useSnackbar } from 'notistack'

const MusicPlayer = memo(() => {
  const fullSize = useShow()
  const volume = useAtomValue(volumeAtom)
  const music = useAtomValue(musicAtom)
  const [, skipNext] = useAtom(skipNextAtom)
  const [, skipPrevious] = useAtom(skipPreviousAtom)
  const [autoPlay, setAutoPlay] = useAtom(autoPlayAtom)
  const isPlayingAds = useAtomValue(isPlayAdsAtom)
  const { enqueueSnackbar } = useSnackbar()
  const musicSource = music?.url || (null as unknown as string)
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

  useEffect(() => {
    if (isPlayingAds) {
      enqueueSnackbar('Please Pay Premium Account To Remove Ads', {
        variant: 'warning',
        autoHideDuration: 10000,
      })
    }
  }, [isPlayingAds, enqueueSnackbar])

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

  const HandleFullSize = () => {
    return (
      <Box
        onClick={() => {
          music && fullSize.onShow()
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      />
    )
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      width="calc(100% - 240px)"
      ml={'240px'}
      zIndex={10}
    >
      <Box
        py={2}
        px={4}
        mx={2}
        my={1}
        height={fullSize.show ? '100%' : 'auto'}
        bgcolor="container.main"
        borderRadius={'24px'}
        display="flex"
        flexDirection="column-reverse"
      >
        <HandleFullSize />
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
              <Typography
                variant="h4"
                noWrap
                maxWidth="fit-content"
                zIndex={10}
              >
                {music?.name}
              </Typography>
              <Typography
                variant="subtitle2"
                noWrap
                maxWidth="fit-content"
                zIndex={10}
              >
                {music?.ownerName}
              </Typography>
            </Stack>
            <MusicControl
              sound={sound}
              onPlay={() => play()}
              onPause={() => pause()}
              onSkipNext={handleSkipNext}
              onSkipPrevious={handleSkipPrevious}
              notAllow={isPlayingAds}
            />
            <SoundControl />
          </Stack>
          <MusicTimeLine
            sound={sound}
            duration={(duration || 0) / 1000}
            notAllow={isPlayingAds}
          />
        </Stack>
        {fullSize.show && (
          <FullSizeContent
            title={music?.name || ''}
            artist={music?.ownerName || ''}
            coverImage={music?.coverImage || ''}
            onClose={() => {
              fullSize.onClose()
            }}
          />
        )}
      </Box>
    </Box>
  )
})

MusicPlayer.displayName = 'MusicPlayer'

export default MusicPlayer
