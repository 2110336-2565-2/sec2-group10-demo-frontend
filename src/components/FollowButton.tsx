import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  isFollowing?: boolean
}

const FollowButton = ({ isFollowing }: ButtonProps) => {
  const color = isFollowing ? 'disable' : 'primary'
  const text = isFollowing ? 'Unfollow' : 'Follow'

  return (
    <MuiButton
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
    </MuiButton>
  )
}

export default FollowButton
