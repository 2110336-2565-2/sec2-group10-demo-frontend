import { Grid } from '@mui/material'
import RegisterForm from '@/components/RegisterForm'

export default function Register() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <RegisterForm />
    </Grid>
  )
}
