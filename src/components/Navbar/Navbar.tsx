import { CheckBox, CloudUpload, Home, QueueMusic } from '@mui/icons-material'
import { Divider, Drawer, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import DemoLogo from '../../assets/demo-logo.svg'
import Button from '../Button'

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
          padding: '24px 32px',
        },
      }}
    >
      <Stack spacing={4} height={'100%'}>
        <Stack spacing={1.5}>
          {/* Change Typo to Button */}
          <Stack
            direction="row"
            spacing={3.5}
            alignContent="center"
            pr={2}
            pl={2}
          >
            <Image src={DemoLogo} alt="demo-logo" width={46} height={41} />
            <Typography variant="h2">DEMO</Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: '3px' }} />
        </Stack>
        <Stack spacing={1.5}>
          <Button startIcon={<Home />} text="Home" />
          <Button startIcon={<QueueMusic />} text="Playlist" />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h2">For Artists</Typography>
          <Divider sx={{ borderBottomWidth: '3px' }} />
        </Stack>
        <Stack spacing={1.5}>
          <Button startIcon={<CloudUpload />} text="Upload Song" />
          <Button startIcon={<CheckBox />} text={'View\nUpload Status'} />
        </Stack>
        <Stack spacing={1.5} mt={'auto !important'}>
          {/* Wait for Auth */}
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
