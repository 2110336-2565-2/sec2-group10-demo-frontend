import { CheckBox, CloudUpload, Home, QueueMusic } from '@mui/icons-material'
import { Button, Divider, Drawer, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DemoLogo from '../../assets/demo-logo.svg'
const ButtonStyling = {
  justifyContent: 'left',
  color: 'white',
  padding: '0',
}

const Navbar = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: '290px',
        flexShrink: 0,
      }}
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
          <Button
            startIcon={<Home sx={{ fontSize: '30px !important' }} />}
            sx={{ ...ButtonStyling, height: '30px' }}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              Home
            </Typography>
          </Button>
          <Button
            startIcon={<QueueMusic sx={{ fontSize: '30px !important' }} />}
            sx={{
              ...ButtonStyling,
              height: '30px',
            }}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              Playlist
            </Typography>
          </Button>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h2">For Artists</Typography>
          <Divider sx={{ borderBottomWidth: '3px' }} />
        </Stack>
        <Stack spacing={1.5}>
          <Button
            startIcon={<CloudUpload sx={{ fontSize: '30px !important' }} />}
            sx={{
              ...ButtonStyling,
              height: '30px',
            }}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              Upload Song
            </Typography>
          </Button>
          <Button
            startIcon={<CheckBox sx={{ fontSize: '30px !important' }} />}
            sx={{
              ...ButtonStyling,
              height: '40px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                textTransform: 'none',
                whiteSpace: 'pre-line',
              }}
            >
              {'View\n upload Status'}
            </Typography>
          </Button>
        </Stack>
        <Stack spacing={1.5} mt={'auto !important'}>
          {/* Wait for Auth */}
          <Button
            variant="text"
            sx={{
              ...ButtonStyling,
              height: '40px',
            }}
            LinkComponent={Link}
            href={'/login'}
          >
            <Typography variant="h4">LOGIN</Typography>
          </Button>
          <Typography variant="subtitle2">
            Contact us: contact@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  )
}
export default Navbar
