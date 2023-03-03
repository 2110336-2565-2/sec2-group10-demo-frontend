import {
  alpha,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'

import { useShow } from '@/hooks/useShow'
import { useState } from 'react'
import Image from 'next/image'
import { useAtom, useAtomValue } from 'jotai'
import { Music, musicAtom, setPlaylistsAtom } from '@/stores/musicPlayerStore'

import PlayMusicGif from '@/assets/playing-music.gif'

interface MusicTableProps {
  musics: Music[]
}

const MusicTable = ({ musics }: MusicTableProps) => {
  const [, setPlaylists] = useAtom(setPlaylistsAtom)

  const handlePlayMusic = (index: number) => {
    setPlaylists(musics, { startIndex: index })
  }

  return (
    <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
      <Table aria-label="music table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" align="center">
              <Typography variant="subtitle1">#</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">TITLE</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">ALBUM</Typography>
            </TableCell>
            <TableCell align="center" width="128px">
              <AccessTimeRoundedIcon />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {musics.map((music, index) => (
            <MusicRow
              key={music.id}
              index={index + 1}
              music={music}
              onClick={() => handlePlayMusic(index)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

interface MusicRowProps {
  index: number
  music: Music
  onClick?: () => void
}

const MusicRow = ({ index, music, onClick }: MusicRowProps) => {
  const playingMusic = useAtomValue(musicAtom)
  const musicMore = useShow()
  const playMusic = useShow()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const musicActions = [
    {
      label: 'Remove',
      onClick: () => {
        console.log('Remove')
      },
    },
  ]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    // format 00:00
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`
  }

  const isPlaying = playingMusic?.id === music.id
  const titleColor = isPlaying ? 'text.secondary' : 'text.primary'

  return (
    <TableRow
      onClick={(e) => {
        if (e.detail === 2) onClick?.()
      }}
      onMouseEnter={playMusic.onShow}
      onMouseLeave={playMusic.onClose}
      sx={{
        '&:hover': {
          backgroundColor: alpha('#fff', 0.2),
        },
        '&> td': {
          borderBottom: 'none',
          py: 1.5,
        },
      }}
    >
      <TableCell padding="checkbox" align="center">
        {isPlaying ? (
          <Image
            src={PlayMusicGif}
            alt="playing-music-gif"
            width={24}
            height={26}
          />
        ) : playMusic.show ? (
          <PlayArrowRoundedIcon
            onClick={onClick}
            sx={{ cursor: 'pointer', fontSize: 28 }}
          />
        ) : (
          <Typography variant="subtitle1">{index}</Typography>
        )}
      </TableCell>
      <TableCell width={'55%'}>
        <Stack direction="row" spacing={1.5}>
          <Image
            src={music.coverImage}
            alt="music-cover-image"
            width={36}
            height={36}
          />
          <Stack>
            <Typography variant="h6" color={titleColor}>
              {music.title}
            </Typography>
            <Typography variant="caption" color={titleColor}>
              {music.artist}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{music.album}</Typography>
      </TableCell>
      <TableCell width="128px">
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Typography variant="subtitle2" align="right">
            {formatTime(music.length)}
          </Typography>
          <Box zIndex={10}>
            <IconButton
              size="small"
              onClick={(e) => {
                musicMore.onShow()
                setAnchorEl(e.currentTarget)
              }}
            >
              <MoreVertIcon sx={{ color: 'text.primary' }} />
            </IconButton>
            <Menu
              id="playlist-more-menu"
              anchorEl={anchorEl}
              open={musicMore.show}
              onClose={musicMore.onClose}
            >
              {musicActions.map((more) => (
                <MenuItem
                  key={more.label}
                  onClick={() => {
                    more.onClick()
                    musicMore.onClose()
                  }}
                >
                  {more.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
export default MusicTable
