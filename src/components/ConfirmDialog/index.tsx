import { Dialog, Stack, Typography } from '@mui/material'
import Button from '../Button'

interface ConfirmDialogProps {
  open: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmDialog = ({ open, onCancel, onConfirm }: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: 'container.main',
          borderRadius: '24px',
        },
      }}
    >
      <Stack spacing={3} px={4} py={3}>
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            Confirm
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Are you sure you want to delete this item?
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            onClick={onCancel}
            color="primary"
            text="Cancel"
            textVariant="subtitle2"
          />
          <Button
            variant="contained"
            onClick={onConfirm}
            color="primary"
            text="Confirm"
            textVariant="subtitle2"
          />
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default ConfirmDialog
