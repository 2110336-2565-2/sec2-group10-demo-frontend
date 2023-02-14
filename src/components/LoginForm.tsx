import { Box, Divider, Typography, Stack, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import DemoLogo from '@/assets/demo-logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from './Button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type Login = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })
  const loginUser = async (data: Login) => {
    //TODO: login user api
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
          spacing={3.5}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image src={DemoLogo} width={64} height={64} alt="Demo Logo" />
          <Typography variant="h1">Demo</Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Typography variant="h2">SIGN IN</Typography>
        </Stack>
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
            text="SIGN IN"
            onClick={handleSubmit(loginUser)}
          />
          <Divider />
          <Button
            variant="text"
            text="sign up"
            LinkComponent={Link}
            href={'/signup'}
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoginForm
