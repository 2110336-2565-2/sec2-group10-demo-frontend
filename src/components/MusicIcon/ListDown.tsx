import {
  Menu,
  MenuItem,
  Fade,
  Stack,
  Alert,
  Typography,
  IconButton,
} from '@mui/material'
import { usePlaylists } from '@/queries/usePlaylist'
import { MouseEvent, useState } from 'react'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'
import * as React from 'react'
import { http } from '@/services/apiAxios'
import { useSession } from 'next-auth/react'
import CloseIcon from '@mui/icons-material/Close'

interface addMusicToPlaylistProp {
  playlistID: string
  musicID: string
}

interface Props {
  inputMusicID: string
}

const ListDown = ({ inputMusicID }: Props) => {
  const playlists = usePlaylists()
  const [anchorElPlaylist, setAnchorElPlaylist] = useState<null | HTMLElement>(
    null
  )
  const [menuOnLeft, setMenuOnLeft] = useState(false)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElPlaylist(event.currentTarget)
    const displayLeft = window.innerWidth - event.clientX < 200
    setMenuOnLeft(displayLeft)
  }
  const handleClosePlaylist = () => {
    setAnchorElPlaylist(null)
  }

  const addMusicToPlaylist = async ({
    playlistID,
    musicID,
  }: addMusicToPlaylistProp) => {
    console.log('/users/playlists/' + playlistID + '/musics')
    http
      .post('/users/playlists/' + playlistID + '/musics', {
        musicIds: [musicID],
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loginStatus = useSession()

  return (
    <div>
      <MenuItem onClick={handleClick}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography noWrap variant="subtitle1">
            Add to playlist
          </Typography>

          <ArrowRightRoundedIcon />
        </Stack>
      </MenuItem>

      {loginStatus.status === 'authenticated' ? (
        <>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorOrigin={{
              horizontal: menuOnLeft ? 'left' : 'right',
              vertical: 'bottom',
            }}
            transformOrigin={{
              horizontal: !menuOnLeft ? 'left' : 'right',
              vertical: 'center',
            }}
            anchorEl={anchorElPlaylist}
            open={!!anchorElPlaylist}
            onClose={handleClosePlaylist}
            TransitionComponent={Fade}
          >
            {playlists?.map((playlist) => (
              <MenuItem
                key={playlist._id}
                onClick={() => {
                  handleClosePlaylist()
                  addMusicToPlaylist({
                    playlistID: playlist._id,
                    musicID: inputMusicID,
                  })
                }}
              >
                {playlist.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Menu
          style={{ height: '100%', width: '100%' }}
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorOrigin={{
            horizontal: menuOnLeft ? 'left' : 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: !menuOnLeft ? 'left' : 'right',
            vertical: 'center',
          }}
          anchorEl={anchorElPlaylist}
          open={!!anchorElPlaylist}
          onClose={handleClosePlaylist}
          TransitionComponent={Fade}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleClosePlaylist()
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            style={{ height: '100%', width: '100%' }}
          >
            <Typography noWrap variant="subtitle1">
              Please log in to use playlists
            </Typography>
          </Alert>
        </Menu>
      )}
    </div>
  )
}

export default ListDown
