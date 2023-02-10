import {
  Box,
  Divider,
  Typography,
  Stack,
  TextField,
  Button,
  ButtonProps,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DemoLogo from '@/assets/demo-logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

type Login = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { register, handleSubmit /*, formState*/ } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })
  const loginUser = async (data: Login) => {
    //TODO: login user api
    console.log('here')
    console.log(data)
  }

  return (
    <Box
      py={8}
      px={3}
      sx={{
        borderRadius: '24px',
        bgcolor: 'container.main',
        maxWidth: '400px',
      }}
    >
      <Stack spacing={6} justifyContent={'center'}>
        <Stack
          direction="row"
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image src={DemoLogo} width={64} height={64} alt="Demo Logo" />
          <Typography variant="h1">Demo</Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Typography variant="h2">Login</Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="standard"
            placeholder="Email"
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'default' },
            }}
            {...register('email')}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'default' },
            }}
            placeholder="Password"
            {...register('password')}
          />
        </Stack>
        <Stack spacing={2}>
          <MyButton variant="contained" onClick={handleSubmit(loginUser)}>
            <Typography>Login</Typography>
          </MyButton>
          <Divider></Divider>
          <MyButton variant="text" LinkComponent={Link} href={'/signup'}>
            <Typography>sign up</Typography>
          </MyButton>
        </Stack>
      </Stack>
    </Box>
  )
}
const MyButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>
}
export default LoginForm
