import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
  TypographyProps,
  CircularProgress,
} from '@mui/material'
interface ButtonProps extends MuiButtonProps {
  text?: string
  active?: boolean
  underline?: boolean
  textVariant?: TypographyProps['variant']
  loading?: boolean
}

const Button = ({
  variant,
  size = 'large',
  sx,
  active,
  text,
  underline,
  textVariant,
  loading,
  ...props
}: ButtonProps) => {
  const getColor = () => {
    if (variant === 'text') {
      return {
        color: active ? 'primary.light' : 'text.primary',
      }
    }
    return {}
  }

  return (
    <MuiButton
      {...props}
      size={size}
      variant={variant}
      disabled={loading}
      sx={{
        ...getColor(),
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Typography
          variant={textVariant || 'h6'}
          sx={{
            textDecoration: underline ? 'underline' : 'none',
          }}
        >
          {text}
        </Typography>
      )}
    </MuiButton>
  )
}

export default Button
