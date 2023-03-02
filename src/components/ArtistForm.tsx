import { Box, Container, Stack, TextField, Typography } from '@mui/material'

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
        <Stack spacing={6} justifyContent={'center'}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={'center'}
          >
            {/* <Image src={DemoLogo} width={64} height={64} alt="Demo Logo" /> */}
            <Typography variant="h1">DEMO</Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField label="Email *" variant="standard" />
            <TextField type="password" label="Password *" variant="standard" />
            <TextField
              type="password"
              label="Confirm Password *"
              variant="standard"
            />
          </Stack>
          <Stack spacing={3}>
            <Stack
              direction={'row'}
              alignItems="center"
              justifyContent={'center'}
            >
              <Typography variant="subtitle2">Have an account?</Typography>
              {/* <Button
                textVariant="subtitle2"
                variant="text"
                text="LOGIN"
                LinkComponent={Link}
                href={'/login'}
              /> */}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default ArtistForm
