import { Dialog, Stack, Typography } from '@mui/material'
import Button from '@/components/Button'
import { InputBox } from '../PremiumRegisterForm'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatBankAccount, validateBankAccount } from './utils'
import { http } from '@/services/apiAxios'
import axios from 'axios'
import { useRouter } from 'next/router'
interface ArtistRegisterFormProps {
  show: boolean
  onClose?: () => void
}
const artistRegisterSchema = z
  .object({
    accountNumber: z.string(),
    bank: z.string().min(1),
  })
  .refine((data) => validateBankAccount(data.accountNumber), {
    message: 'Invalid account number',
    path: ['accountNumber'],
  })
type ArtistRegisterFormValues = z.infer<typeof artistRegisterSchema>

const ArtistRegisterForm = ({ show, onClose }: ArtistRegisterFormProps) => {
  const { register, handleSubmit, formState } =
    useForm<ArtistRegisterFormValues>({
      mode: 'onChange',
      resolver: zodResolver(artistRegisterSchema),
    })
  const router = useRouter()
  const onSubmit = handleSubmit(async (data) => {
    // TODO: call premium user api
    const sendData = {
      accountNumber: data.accountNumber,
      bankName: data.bank,
    }
    await http
      .put('/users/role/artist', sendData)
      .then(() => {
        router.push('/profile')
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          alert(e.response?.data.message)
          console.log(e)
        }
      })
    onClose?.()
  })

  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: 'container.main',
          borderRadius: '24px',
          width: '100%',
        },
      }}
    >
      <Stack px={4} py={8} spacing={3}>
        <Typography variant="h2">Artist Form</Typography>

        <Stack spacing={2}>
          <InputBox
            type="number"
            label="Account number *"
            placeholder="Account number"
            {...register('accountNumber')}
            error={!!formState.errors.accountNumber}
            transform={(value) => formatBankAccount(value)}
            helperText={
              formState.errors.accountNumber && 'Invalid account number'
            }
          />

          <InputBox
            type="string"
            label="Bank *"
            placeholder="Bank"
            {...register('bank')}
            error={!!formState.errors.bank}
            helperText={formState.errors.bank && 'bank is required'}
          />

          <Button
            variant="contained"
            text="Register"
            style={{ textTransform: 'none' }}
            onClick={onSubmit}
          />
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default ArtistRegisterForm
