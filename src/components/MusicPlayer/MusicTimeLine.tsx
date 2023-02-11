import { Stack, Typography, Slider } from '@mui/material'
import { Howl } from 'howler'
import { useState, useRef, useEffect } from 'react'

interface MusicTimeLineProps {
  sound?: Howl
  duration: number
  onTimeChange?: (v: number) => void
}

const MusicTimeLine = ({ sound, duration }: MusicTimeLineProps) => {
  const [currTime, setCurrentTime] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  const requestRef = useRef<number>(0)
  useEffect(() => {
    const updateSeek = () => {
      const seek = sound?.seek()
      if (typeof seek === 'number' && !isSeeking) {
        setCurrentTime(~~(seek * 10) / 10)
      }
      requestRef.current = requestAnimationFrame(updateSeek)
    }
    requestRef.current = requestAnimationFrame(updateSeek)
    return () => cancelAnimationFrame(requestRef.current)
  }, [sound, isSeeking])

  const timeFormat = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    if (seconds < 10) return `${minutes}.0${seconds}`
    return `${minutes}.${seconds}`
  }

  const timelinePercent = (currTime / duration) * 100 || 0
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={4}
    >
      <Typography variant="h4" flex={'0 0 60px'}>
        {timeFormat(currTime)}
      </Typography>
      <Slider
        aria-label="Music Time Line"
        value={timelinePercent || 0}
        onMouseDown={() => setIsSeeking(true)}
        onMouseUp={() => {
          if (sound) sound.seek(currTime)
          setIsSeeking(false)
        }}
        onChange={(_, v) => setCurrentTime(((v as number) / 100) * duration)}
        sx={{
          '& .MuiSlider-thumb': {
            display: 'none',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'gray.main',
            opacity: '1',
          },
        }}
      />
      <Typography variant="h4" flex={'0 0 60px'} textAlign={'end'}>
        {timeFormat(duration)}
      </Typography>
    </Stack>
  )
}

export default MusicTimeLine
