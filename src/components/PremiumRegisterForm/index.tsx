import {
  Dialog,
  TextFieldProps,
  Stack,
  TextField,
  Typography,
  Box,
  alpha,
} from '@mui/material'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { forwardRef } from 'react'
import {
  formatCreditCardNumber,
  formatExpirationDate,
  validateCreditCardNumber,
} from './utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { http } from '@/services/apiAxios'
import { useRouter } from 'next/router'
import axios from 'axios'

interface PremiumRegisterFormProps {
  show: boolean
  onClose?: () => void
}

const premiumRegisterSchema = z
  .object({
    name: z.string().min(1),
    cardNumber: z.string(),
    expire: z.string().min(1),
    cvc: z.string().min(1),
  })
  .refine((data) => validateCreditCardNumber(data.cardNumber), {
    message: 'Invalid card number',
    path: ['cardNumber'],
  })

type PremiumRegisterFormValues = z.infer<typeof premiumRegisterSchema>

const PremiumRegisterForm = ({ show, onClose }: PremiumRegisterFormProps) => {
  const { register, handleSubmit, formState } =
    useForm<PremiumRegisterFormValues>({
      mode: 'onChange',
      resolver: zodResolver(premiumRegisterSchema),
    })
  const router = useRouter()
  const onSubmit = handleSubmit(async (data) => {
    // TODO: call premium user api
    const sendData = {
      name: data.name,
      cardNumber: data.cardNumber,
      expireDate: data.expire,
      cvc: data.cvc,
    }
    await http
      .put('/users/role/premium', sendData)
      .then(() => {
        router.push('/home')
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          alert(e.response?.data.message)
          console.log(e)
        }
      })
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
        },
      }}
    >
      <Stack px={4} py={8} spacing={3}>
        <Typography variant="h2">Premium Form</Typography>
        <Stack spacing={2}>
          <InputBox
            label="Name *"
            placeholder="Name"
            autoComplete="cc-name"
            {...register('name')}
            error={!!formState.errors.name}
            helperText={formState.errors.name && 'Name is required'}
          />
          <InputBox
            type="number"
            label="Card Number *"
            placeholder="Card Number"
            autoComplete="cc-number"
            {...register('cardNumber')}
            transform={(value) => formatCreditCardNumber(value)}
            error={!!formState.errors.cardNumber}
            helperText={formState.errors.cardNumber && 'Invalid card number'}
          />
          <Stack direction="row" spacing={2}>
            <Box>
              <InputBox
                type="number"
                label="Expiration *"
                placeholder="MM/YY"
                autoComplete="cc-exp"
                {...register('expire')}
                transform={(value) => formatExpirationDate(value)}
                error={!!formState.errors.expire}
                helperText={formState.errors.expire && 'Invalid expire date'}
              />
            </Box>
            <Box>
              <InputBox
                type="number"
                label="CVC/CNV *"
                placeholder="CVC/CNV"
                autoComplete="cc-csc"
                {...register('cvc')}
                error={!!formState.errors.cvc}
                helperText={formState.errors.cvc && 'CVC/CNV is required'}
              />
            </Box>
          </Stack>
          <Button variant="contained" text="upgrade" onClick={onSubmit} />
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default PremiumRegisterForm

interface TransformProps {
  transform?: (value: string) => string
}

export const InputBox = forwardRef(
  (
    {
      label,
      type,
      onChange,
      transform,
      ...props
    }: TextFieldProps & TransformProps,
    ref
  ) => {
    const numericInputProps = {
      inputProps: {
        inputMode: 'numeric',
        pattern: '[0-9]*',
      },
    }

    return (
      <Stack spacing={2}>
        <Typography variant="subtitle1">{label}</Typography>
        <TextField
          variant="outlined"
          inputRef={ref}
          {...props}
          {...(type === 'number' ? numericInputProps : {})}
          onChange={(e) => {
            if (transform) {
              e.target.value = transform(e.target.value)
            }
            onChange?.(e)
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          size="small"
          InputProps={{
            sx: {
              '&.Mui-focused': {
                bgcolor: alpha('#fff', 0.04),
                fieldset: {
                  borderColor: alpha('#fff', 0.15) + '!important',
                },
              },
              bgcolor: alpha('#fff', 0.15),
            },
          }}
        />
      </Stack>
    )
  }
)
InputBox.displayName = 'InputBox'
