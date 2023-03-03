import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import Button from './Button'

const ArtistForm = () => {
  return (
    <Container maxWidth="xs">
      <Box
        py={8}
        px={3}
        sx={{
          bgcolor: 'container.main',
          borderRadius: '24px',
          width: '100%',
        }}
      >
        <Stack spacing={3} justifyContent={'center'}>
          <Stack>
            <Typography variant="h2">Artist Form</Typography>
          </Stack>
          <Stack>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">Account number *</Typography>

                <TextField
                  variant="outlined"
                  placeholder="Account number"
                  inputProps={{
                    style: { height: '16px', padding: '8px 12px' },
                  }}
                  sx={{ input: { color: 'secondary' } }}
                />
              </Stack>
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">Bank *</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Bank"
                  inputProps={{
                    style: { height: '16px', padding: '8px 12px' },
                  }}
                  sx={{ input: { color: 'secondary' } }}
                />
              </Stack>
              <Button
                variant="contained"
                text="Register"
                style={{ textTransform: 'none' }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default ArtistForm
