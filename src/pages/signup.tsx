import { Stack } from '@mui/material'
import RegisterForm from '@/components/RegisterForm'

export default function Signup() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <RegisterForm />
    </Stack>
  )
}
