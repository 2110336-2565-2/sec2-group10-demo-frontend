import { followArtist, unFollowArtist } from '@/queries/useArtist'
import {
  Button,
  ButtonProps as MuiButtonProps,
  Typography,
} from '@mui/material'
import { useState } from 'react'

interface ButtonProps extends MuiButtonProps {
  artistId: string
  isFollowing?: boolean
}

const FollowButton = ({
  artistId,
  isFollowing: initIsFollowing,
}: ButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(
    initIsFollowing || false
  )

  const handleClick = async () => {
    if (isFollowing) {
      await unFollowArtist(artistId).then(() => setIsFollowing(false))
    } else {
      await followArtist(artistId).then(() => setIsFollowing(true))
    }
  }

  const color = isFollowing ? 'purple.main' : 'primary.main'
  const text = isFollowing ? 'Unfollow' : 'Follow'
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
