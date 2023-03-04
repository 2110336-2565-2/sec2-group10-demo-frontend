import { Menu, MenuItem, Fade, Stack } from '@mui/material'
import { usePlaylists } from '@/queries/usePlaylist'
import { MouseEvent, useState } from 'react'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'

export default function ListDown() {
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

  const DoSomethingHandler = () => {
    console.log('hello')
    console.log(playlists)
    // TODO: add to playlist API
  }

  return (
    <div>
      <MenuItem onClick={handleClick}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          Add to playlist
          <ArrowRightRoundedIcon />
        </Stack>
      </MenuItem>

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
              DoSomethingHandler()
            }}
          >
            {playlist.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
