import { Dialog, Stack, Typography } from '@mui/material'
import NewAlbum from './NewAlbum'
import NewPlaylist from './NewPlaylist'

interface NewPlaylistProps {
  open: boolean
  onClose?: () => void
}

const NewPlaylistDialog = ({ open, onClose }: NewPlaylistProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'container.main',
          justifyContent: 'center',
          borderRadius: '24px',
          px: '8px',
          py: '20px',
          width: '750px',
          height: '540px',
        },
      }}
    >
      <Stack spacing={2} alignItems="center" width="100%">
        <Typography noWrap variant="h3" alignItems="center">
          Select
        </Typography>
        <Stack direction="row" justifyContent="space-evenly" width="100%">
          <NewPlaylist />
          <NewAlbum />
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewPlaylistDialog
