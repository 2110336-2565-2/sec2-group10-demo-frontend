import { followArtist, unFollowArtist } from '@/queries/useArtist'
import { useIsFollowing } from '@/queries/useProfile'
import {
  Button,
  ButtonProps as MuiButtonProps,
  Typography,
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  artistId: string
}

const FollowButton = ({ artistId }: ButtonProps) => {
  const { data, isLoading, mutate } = useIsFollowing(artistId)

  const handleClick = async () => {
    if (data) {
      await unFollowArtist(artistId).then(() => mutate(false))
    } else {
      await followArtist(artistId).then(() => mutate(true))
    }
  }

  const color = data ? 'purple.main' : 'primary.main'
  const text = data ? 'Unfollow' : 'Follow'

  if (isLoading || data === undefined) return null
  return (
    <Button
      variant="contained"
      sx={{
        p: '12px 20px',
        borderRadius: '12px',
        boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.3)',
        backgroundColor: color,
        '&:hover': {
          backgroundColor: color,
        },
      }}
      onClick={handleClick}
    >
      <Typography variant={'h5'} color="text.primary">
        {text}
      </Typography>
    </Button>
  )
}

export default FollowButton
