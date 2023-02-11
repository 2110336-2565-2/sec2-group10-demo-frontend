import { Stack, Box, Slider } from '@mui/material'
import { useRef, useState } from 'react'

import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded'
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import { useAtom } from 'jotai'
import { volumeAtom } from '@/stores/musicPlayerStore'

const SoundControl = () => {
  const [isMute, setIsMute] = useState(false)
  const [volume, setVolume] = useAtom(volumeAtom)
  const beforeMuteVolume = useRef<number>(0)

  const toggleMute = () => {
    if (isMute) {
      setVolume(beforeMuteVolume.current)
    } else {
      beforeMuteVolume.current = volume
      setVolume(0)
    }
    setIsMute(!isMute)
  }

  const VolumeIcon = () => {
    if (isMute)
      return (
        <VolumeOffRoundedIcon fontSize="large" sx={{ cursor: 'pointer' }} />
      )
    if (volume === 0)
      return (
        <VolumeMuteRoundedIcon fontSize="large" sx={{ cursor: 'pointer' }} />
      )
    if (volume < 0.5)
      return (
        <VolumeDownRoundedIcon fontSize="large" sx={{ cursor: 'pointer' }} />
      )
    return <VolumeUpRoundedIcon fontSize="large" sx={{ cursor: 'pointer' }} />
  }

  return (
    <Stack
      direction={'row'}
      spacing={1.5}
      alignItems={'center'}
      flex={1}
      justifyContent="flex-end"
    >
      <Box display={'flex'} onClick={toggleMute}>
        <VolumeIcon />
      </Box>
      <Slider
        aria-label="Volume"
        value={volume}
        onChange={(_, v) => setVolume(v as number)}
        disabled={isMute}
        onWheel={(e) => {
          const delta = e.deltaY > 0 ? -1 : 1
          setVolume((v) => {
            const newVolume = v + delta * 5
            const boundVolume = Math.min(Math.max(newVolume, 0), 100)
            return boundVolume
          })
        }}
        sx={{
          maxWidth: '128px',
          '& .MuiSlider-thumb': {
            display: 'none',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'gray.main',
            opacity: '1',
          },
        }}
      />
    </Stack>
  )
}

export default SoundControl
