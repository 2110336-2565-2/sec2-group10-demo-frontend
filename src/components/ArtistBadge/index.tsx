import { Box, Typography } from '@mui/material'

const ArtistBadge = () => {
  return (
    <Box
      py={0.5}
      px={2}
      boxShadow="-4px 4px 12px rgba(0, 0, 0, 0.3)"
      borderRadius="16px"
      sx={{
        background: 'linear-gradient(87.03deg, #7B7BFF 10.24%, #1564FE 90.22%)',
      }}
    >
      <Typography variant="h4">Artist</Typography>
    </Box>
  )
}

export default ArtistBadge
