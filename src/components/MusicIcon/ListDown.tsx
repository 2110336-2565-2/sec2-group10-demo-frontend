import * as React from 'react'
import { Menu, MenuItem, Fade } from '@mui/material'
import { http } from '@/services/apiAxios'
import { usePlaylists } from '@/queries/usePlaylist'

export default function ListDown() {
  const playlists = usePlaylists()
  const [anchorElPlaylist, setAnchorElPlaylist] =
    React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorElPlaylist)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPlaylist(event.currentTarget)
  }
  const handleClosePlaylist = () => {
    setAnchorElPlaylist(null)
  }

  const DoSomethingHandler = () => {
    console.log('hello')
    console.log(playlists)
    // TODO: add to playlist API
  }

  const ListAllPlaylist = async () => {
    http.get('/users/playlists/all').then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }
  return (
    <div>
      <MenuItem
        onClick={(e) => {
          ListAllPlaylist()
          handleClick(e)
        }}
      >
        Add to playlist
      </MenuItem>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorEl={anchorElPlaylist}
        open={open}
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
