import { Stack, Typography } from '@mui/material'
import { isAxiosError } from 'axios'
import { useSnackbar } from 'notistack'

const ErrorMessageBody = ({
  message,
  code,
}: {
  message: string
  code: number | null
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {code && <Typography variant="h6">{code}</Typography>}
      <Typography variant="body2">{message}</Typography>
    </Stack>
  )
}

const useError = () => {
  const { enqueueSnackbar } = useSnackbar()

  const onError = (error: unknown) => {
    console.error(error)

    const { message, code } = buildSnackbarError(error)

    enqueueSnackbar(<ErrorMessageBody message={message} code={code} />, {
      variant: 'error',
    })
  }

  return { onError }
}

const buildSnackbarError = (error: unknown) => {
  if (isAxiosError(error)) {
    const errCode = error.response?.status
    switch (errCode) {
      case 400:
        return {
          message: 'Bad Request',
          code: 400,
        }
      case 401:
        return {
          message: 'Unauthorized',
          code: 401,
        }
      case 403:
        return {
          message: 'Forbidden',
          code: 403,
        }
      case 404:
        return {
          message: 'Not Found',
          code: 404,
        }
      case 409:
        return {
          message: 'Conflict',
          code: 409,
        }
      case 500:
        return {
          message: 'Internal Server Error',
          code: 500,
        }
      default:
        return {
          message: 'Unknown Error',
          code: null,
        }
    }
  } else if (error instanceof Error) {
    return {
      message: error.message,
      code: null,
    }
  } else if (typeof error === 'string') {
    return {
      message: error,
      code: null,
    }
  }
  return {
    message: 'Unknown Error',
    code: null,
  }
}

export { useError }
