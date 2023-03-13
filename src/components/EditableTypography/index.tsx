import { useShow } from '@/hooks/useShow'
import {
  TypographyProps,
  Box,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useEffect, useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type EditableTypographyProps<F extends FieldValues> = TypographyProps & {
  onFocus?: () => void
  enable?: boolean
  showEditBox?: boolean
  name: Path<F>
  control: Control<F>
}

const EditableTypography = <F extends FieldValues>({
  children,
  onChange,
  onFocus,
  enable,
  showEditBox,
  name,
  control,
  ...props
}: EditableTypographyProps<F>) => {
  const { field } = useController({
    name,
    control,
  })
  const typoRef = useRef<HTMLParagraphElement>(null)
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
        className={typoRef.current?.className}
        onFocus={() => {
          onFocus?.()
          editBox.onShow()
        }}
        style={{
          display: 'block',
          width: '100%',
          backgroundColor: editBox.show ? alpha('#fff', 0.2) : 'transparent',
          color: theme.palette.text.primary,
          border: 'none',
          borderRadius: '8px',
          outline: 'none',
          padding: 0,
        }}
        disabled={enable === false}
      />
      <Typography {...props} display="none" ref={typoRef} />
    </Box>
  )
}

export default EditableTypography
