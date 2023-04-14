import { Typography, TypographyProps } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
interface ButtonProps extends LoadingButtonProps {
  text?: string
  active?: boolean
  underline?: boolean
  textVariant?: TypographyProps['variant']
}

const Button = ({
  variant,
  size = 'large',
  sx,
  active,
  text,
  underline,
  textVariant,
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
    <LoadingButton
      {...props}
      size={size}
      variant={variant}
      sx={{
        ...getColor(),
        ...sx,
      }}
    >
      <Typography
        variant={textVariant || 'h6'}
        sx={{
          textDecoration: underline ? 'underline' : 'none',
        }}
      >
        {text}
      </Typography>
    </LoadingButton>
  )
}

export default Button
