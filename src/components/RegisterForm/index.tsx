import DemoLogo from '@/assets/demo-logo.svg'
import { http } from '@/services/apiAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../Button'

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password is not match',
    path: ['confirmPassword'],
  })

type Register = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const router = useRouter()
  const [registerError, setRegisterError] = useState(false)
  const { register, handleSubmit, formState } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  })

  const registerUser = async (data: Register) => {
    //TODO: Handle error
    // - Already register
    const sendData = {
      password: data.password,
      email: data.email,
    }
    console.log(sendData)
    await http
      .post('/users', sendData)
      .then(() => {
        router.push('/login')
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setRegisterError(true)
        }
      })
  }

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
            <Image src={DemoLogo} width={64} height={64} alt="Demo Logo" />
            <Typography variant="h1">DEMO</Typography>
          </Stack>
          {registerError && (
            <Alert severity="error" onClose={() => setRegisterError(false)}>
              This email address has already been registered.
            </Alert>
          )}
          <Stack spacing={2}>
            <TextField
              label="Email *"
              variant="standard"
              helperText={
                !!formState.errors.email && 'Please enter a valid email address'
              }
              error={!!formState.errors.email}
              {...register('email')}
            />
            <TextField
              type="password"
              label="Password *"
              variant="standard"
              helperText={
                !!formState.errors.password &&
                'Password must be at least 5 characters'
              }
              error={!!formState.errors.password}
              {...register('password')}
            />
            <TextField
              type="password"
              label="Confirm Password *"
              variant="standard"
              helperText={
                !!formState.errors.confirmPassword && 'Password is not match'
              }
              error={!!formState.errors.confirmPassword}
              {...register('confirmPassword')}
            />
          </Stack>
          <Stack spacing={3}>
            <Button
              variant="contained"
              text="SIGN UP"
              onClick={handleSubmit(registerUser)}
            />
            <Stack
              direction={'row'}
              alignItems="center"
              justifyContent={'center'}
            >
              <Typography variant="subtitle2">Have an account?</Typography>
              <Button
                textVariant="subtitle2"
                variant="text"
                text="LOGIN"
                LinkComponent={Link}
                href={'/login'}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default RegisterForm
