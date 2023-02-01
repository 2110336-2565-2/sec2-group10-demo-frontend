import { Divider, Drawer, Stack, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={true}
      PaperProps={{
        sx: {
          backgroundColor: 'container.main',
          border: '0px',
          width: '290px',
          alignItems: 'center',
          padding: '24px 32px',
        },
      }}
    >
      <Stack spacing={4} height={'100%'}>
        <Stack spacing={1.5}>
          <Typography variant="h2">DEMO</Typography>
          <Divider />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h6">Home</Typography>
          <Typography variant="h6">Playlist</Typography>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h2">For Artists</Typography>
          <Divider />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h6">Upload Song</Typography>
          <Typography variant="h6" whiteSpace="pre-line">
            {'View \n Upload Status'}
          </Typography>
        </Stack>
        <Stack spacing={1.5} mt={'auto !important'}>
          <Typography variant="h6">UserName</Typography>
          <Typography variant="subtitle2">
            Contact us: contact@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  )
}
export default Navbar
