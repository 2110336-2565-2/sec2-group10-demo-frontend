import {
  Box,
  Divider,
  Typography,
  Stack,
  TextField,
  Container,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DemoLogo from '@/assets/demo-logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from './Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Alert } from '@mui/material'
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type Login = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })
  const loginUser = async (data: Login) => {
    //TODO: login user api
    setLoading(true)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    setLoading(false)
    if (result?.ok) {
      router.push('/home')
    } else {
      setLoginError(true)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        py={8}
        px={3}
        sx={{
          borderRadius: '24px',
          bgcolor: 'container.main',
        }}
      >
        <Stack spacing={6} justifyContent={'center'}>
          <Stack
            direction="row"
            spacing={3.5}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Image src={DemoLogo} width={64} height={64} alt="Demo Logo" />
            <Typography variant="h1">DEMO</Typography>
          </Stack>
          <Stack alignItems={'center'}>
            <Typography variant="h2">LOGIN</Typography>
          </Stack>
          {loginError && (
            <Alert severity="error" onClose={() => setLoginError(false)}>
              The email address or password you entered is incorrect
            </Alert>
          )}
          <Stack spacing={3}>
            <TextField
              label="Email"
              variant="standard"
              placeholder="Email"
              helperText={
                !!formState.errors.email && 'Please enter a valid email address'
              }
              error={!!formState.errors.email}
              {...register('email')}
            />
            <TextField
              label="Password"
              variant="standard"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </Stack>
          <Stack spacing={3}>
            <Button
              variant="contained"
              text="LOGIN"
              onClick={handleSubmit(loginUser)}
              disabled={loading}
            />
            <Divider />
            <Button
              variant="text"
              text="SIGN UP"
              LinkComponent={Link}
              href={'/signup'}
            />
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default LoginForm
