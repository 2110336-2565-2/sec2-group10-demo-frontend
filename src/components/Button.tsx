import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  text?: string
  active?: boolean
  underline?: boolean
}

const Button = ({
  variant,
  size = 'large',
  sx,
  active,
  text,
  underline,
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
      sx={{
        ...getColor(),
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textDecoration: underline ? 'underline' : 'none',
        }}
      >
        {text}
      </Typography>
    </MuiButton>
  )
}

export default Button
