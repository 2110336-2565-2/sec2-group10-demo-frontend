import { useShow } from '@/hooks/useShow'
import { Box, alpha, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { useEffect } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type EditableTypographyProps<F extends FieldValues> = {
  variant: Variant
  children: React.ReactNode
  onFocus?: () => void
  enable?: boolean
  showEditBox?: boolean
  name: Path<F>
  control: Control<F>
}

const EditableTypography = <F extends FieldValues>({
  variant = 'h1' as const,
  onFocus,
  enable,
  showEditBox,
  name,
  control,
}: EditableTypographyProps<F>) => {
  const { field } = useController({
    name,
    control,
  })
  const editBox = useShow()
  const theme = useTheme()

  useEffect(() => {
    if (showEditBox !== undefined) {
      editBox.setShow(showEditBox)
    }
  }, [showEditBox])

  return (
    <Box width="100%">
      <input
        {...field}
        autoComplete="off"
        onFocus={() => {
          onFocus?.()
          editBox.onShow()
        }}
        style={{
          display: 'block',
          width: '100%',
          backgroundColor: editBox.show ? alpha('#fff', 0.2) : 'transparent',
          color: theme.palette.text.primary,
          fontFamily: theme.typography[variant].fontFamily,
          fontSize: theme.typography[variant].fontSize,
          fontWeight: theme.typography[variant].fontWeight,
          lineHeight: theme.typography[variant].lineHeight,
          letterSpacing: theme.typography[variant].letterSpacing,
          border: 'none',
          borderRadius: '8px',
          outline: 'none',
          padding: 0,
        }}
        disabled={enable === false}
      />
    </Box>
  )
}

export default EditableTypography
