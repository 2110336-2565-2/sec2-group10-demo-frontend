import {
  Button,
  ButtonProps as MuiButtonProps,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  isFollowing?: boolean
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f3fe4',
    },
    secondary: {
      main: '#434378',
    },
    container: {
      main: '#0D173C',
      light: '#1E2C60',
    },
    gray: {
      main: '#D9D9D9',
    },
  },
})

const FollowButton = ({ isFollowing }: ButtonProps) => {
  const color = isFollowing ? 'secondary' : 'primary'
  const text = isFollowing ? 'Unfollow' : 'Follow'

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={color}
        sx={{
          p: '12px 20px',
          borderRadius: '12px',
          boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onClick={() => {
          // TODO: follow&unfollow api
        }}
      >
        <Typography variant={'h5'} color="text.primary">
          {text}
        </Typography>
      </Button>
    </ThemeProvider>
  )
}

export default FollowButton
