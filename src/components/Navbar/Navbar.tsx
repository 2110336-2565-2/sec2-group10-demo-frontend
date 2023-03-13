import { CloudUpload, Home, QueueMusic } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DemoLogo from '../../assets/demo-logo.svg'
const ButtonStyling = {
  justifyContent: 'left',
  color: 'white',
  padding: '0',
}

const Navbar = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const handleLogout = async () => {
    const logout_return = await signOut()
    console.log('logout', logout_return)
  }
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: '240px',
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'container.main',
          border: '0px',
          width: '240px',
          padding: '32px 24px',
        },
      }}
    >
      <Stack spacing={4} height={'100%'}>
        <Stack spacing={1.5}>
          {/* Change Typo to Button */}
          <Stack
            direction="row"
            spacing={1.5}
            alignContent="center"
            alignItems="center"
            pr={2}
            pl={2}
          >
            <Image src={DemoLogo} alt="demo-logo" width={46} height={41} />
            <Typography variant="h3">DEMO</Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: '3px' }} />
        </Stack>
        <Stack spacing={1.5}>
          <Button
            startIcon={<Home sx={{ fontSize: '30px !important' }} />}
            sx={{ ...ButtonStyling, height: '30px' }}
            LinkComponent={Link}
            href={'/home'}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              Home
            </Typography>
          </Button>
          {/* <Button
            startIcon={<QueueMusic sx={{ fontSize: '30px !important' }} />}
            sx={{
              ...ButtonStyling,
              height: '30px',
            }}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              Playlist
            </Typography>
          </Button> */}
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="h3">For Artists</Typography>
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
            startIcon={<QueueMusic sx={{ fontSize: '30px !important' }} />}
            sx={{
              ...ButtonStyling,
              height: '30px',
            }}
            LinkComponent={Link}
            href={'/playlists'}
          >
            <Typography variant="h6" sx={{ textTransform: 'none' }}>
              My Playlist
            </Typography>
          </Button>
          {/* hide upload status */}
          {/* <Button
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
          </Button> */}
        </Stack>

        <Stack spacing={1.5} mt={'auto !important'}>
          {status === 'authenticated' ? (
            <>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={() => {
                  router.push('/profile')
                }}
              >
                <Avatar
                  alt="avatar-icon"
                  src={data?.user?.image || undefined}
                  sx={{ width: 30, height: 30 }}
                />
                <Typography variant="h5" noWrap>
                  {data?.user?.name}
                </Typography>
              </Stack>
            </>
          ) : (
            <Button
              variant="text"
              sx={{
                ...ButtonStyling,
                height: '40px',
              }}
              LinkComponent={Link}
              href={'/login'}
            >
              <Typography
                variant="h4"
                sx={{
                  textDecoration: 'underline',
                }}
              >
                LOGIN
              </Typography>
            </Button>
          )}
          <Typography variant="subtitle2">
            Contact us: contact@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  )
}
export default Navbar
