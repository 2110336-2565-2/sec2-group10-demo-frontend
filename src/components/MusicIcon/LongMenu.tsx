import MoreVertIcon from '@mui/icons-material/MoreVert'
import * as React from 'react'
import { IconButton, Menu, MenuItem, Fade, Typography } from '@mui/material'

import ListDown from '@/components/MusicIcon/ListDown'
interface Props {
  musicID: string
}

const LongMenu = ({ musicID }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        sx={{ p: 0 }}
      >
        <MoreVertIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Typography noWrap variant="subtitle1">
            Love
          </Typography>
        </MenuItem>

        <ListDown inputMusicID={musicID} />
      </Menu>
    </div>
  )
}

export default LongMenu
