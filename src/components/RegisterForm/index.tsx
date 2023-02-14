import {
  Box,
  Button,
  ButtonProps,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DemoLogo from '@/assets/demo-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { http } from '@/services/apiAxios'
import { useRouter } from 'next/router'

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(5),
  confirmPassword: z.string().min(6).max(20),
})

type Register = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  })

  const registerUser = async (data: Register) => {
    //TODO: Handle error
    // - Already register
    const sendData = {
      username: data.username,
      password: data.password,
      email: data.email,
    }
    console.log(sendData)
    await http.post('/users', sendData).then(() => {
      router.push('/signin')
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
          <Stack spacing={2}>
            <TextField
              label="Username *"
              variant="standard"
              helperText={
                !!formState.errors.username &&
                'Username must be between 3 and 20 characters'
              }
              error={!!formState.errors.username}
              {...register('username')}
            />
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
            <MyButton
              variant="contained"
              size={'large'}
              onClick={handleSubmit(registerUser)}
            >
              <Typography>SIGNUP</Typography>
            </MyButton>
            <Stack
              direction={'row'}
              alignItems="center"
              justifyContent={'center'}
            >
              <Typography variant="subtitle2">Have an account?</Typography>
              <MyButton variant="text" LinkComponent={Link} href={'/login'}>
                <Typography variant="subtitle2">
                  <b>LOGIN</b>
                </Typography>
              </MyButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default RegisterForm

//TODO: use own button component
const MyButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>
}
