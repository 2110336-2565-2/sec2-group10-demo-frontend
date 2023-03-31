import AddPlaylistCardIcon from '@/assets/addplaylistcard-icon.svg'
import { useShow } from '@/hooks/useShow'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import NewPlaylistDialog from './NewPlaylistDialog'

const NewPlaylistCard = () => {
  const createNewDialog = useShow()

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="container.light"
        borderRadius="4px"
        py={'10%'}
        width={'100%'}
        height={'100%'}
        boxShadow="0px 2px 12px rgba(0, 0, 0, 0.5)"
        onClick={() => {
          createNewDialog.onShow()
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Stack spacing={3.5} alignItems="center" width="100%">
          <Box
            sx={{
              width: '70%',
              position: 'relative',
              aspectRatio: '1 / 1',
            }}
          >
            <Image src={AddPlaylistCardIcon} fill alt="addplaylist-icon" />
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: 'text.primary' }}
          >
            Add a new playlist
          </Typography>
        </Stack>
      </Box>
      <NewPlaylistDialog
        open={createNewDialog.show}
        onClose={createNewDialog.onClose}
      />
    </>
  )
}

export default NewPlaylistCard
