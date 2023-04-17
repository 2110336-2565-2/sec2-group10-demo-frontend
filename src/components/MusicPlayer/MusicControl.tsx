import { Stack } from '@mui/material'
import { useState, useRef, useEffect } from 'react'

import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import { Howl } from 'howler'

interface MusicControlProps {
  sound?: Howl
  onPlay?: () => void
  onPause?: () => void
  onSkipNext?: () => void
  onSkipPrevious?: () => void
  onShuffle?: () => void
  onRepeat?: () => void
  notAllow?: boolean
}
const MusicControl = (p: MusicControlProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const requestRef = useRef<number>(0)
  useEffect(() => {
    const updatePlaying = () => {
      const playing = p?.sound?.playing()
      if (typeof playing === 'boolean') {
        setIsPlaying(playing)
      }
      requestRef.current = requestAnimationFrame(updatePlaying)
    }
    requestRef.current = requestAnimationFrame(updatePlaying)
    return () => cancelAnimationFrame(requestRef.current)
  }, [p?.sound])

  return (
    <Stack flex={1} alignItems="center">
      <Stack direction={'row'} spacing={3} alignItems={'center'} zIndex={10}>
        <ShuffleRoundedIcon onClick={p.onShuffle} sx={{ cursor: 'pointer' }} />
        <Stack direction={'row'}>
          <SkipPreviousRoundedIcon
            sx={{ cursor: p.notAllow ? 'not-allowed' : 'pointer' }}
            fontSize={'large'}
            onClick={() => !p.notAllow && p.onSkipPrevious?.()}
          />
          {isPlaying ? (
            <PauseRoundedIcon
              onClick={() => !p.notAllow && p.onPause?.()}
              fontSize={'large'}
              sx={{ cursor: p.notAllow ? 'not-allowed' : 'pointer' }}
            />
          ) : (
            <PlayArrowRoundedIcon
              onClick={p.onPlay}
              fontSize={'large'}
              sx={{ cursor: 'pointer' }}
            />
          )}
          <SkipNextRoundedIcon
            fontSize={'large'}
            onClick={() => !p.notAllow && p.onSkipNext?.()}
            sx={{ cursor: p.notAllow ? 'not-allowed' : 'pointer' }}
          />
        </Stack>
        <RepeatRoundedIcon onClick={p.onRepeat} sx={{ cursor: 'pointer' }} />
      </Stack>
    </Stack>
  )
}

export default MusicControl
