import { useShow } from '@/hooks/useShow'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { alpha, Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  Control,
  FieldValues,
  Path,
  useController,
  useWatch,
} from 'react-hook-form'

interface EditableImageProps<F extends FieldValues> {
  src: string
  alt: string
  width: number
  height: number
  enable?: boolean
  name: Path<F>
  control: Control<F>
  borderRadius?: string
}

const EditableImage = <F extends FieldValues>({
  src,
  width,
  height,
  alt,
  enable,
  name,
  control,
  borderRadius,
}: EditableImageProps<F>) => {
  const { field } = useController({
    name,
    control,
  })
  const fileWatch = useWatch({ name, control })
  const [previewUploadImageUrl, setPreviewUploadImageUrl] = useState<string>()
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const editBox = useShow()

  useEffect(() => {
    if (fileWatch) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUploadImageUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(fileWatch)
    } else {
      setPreviewUploadImageUrl(undefined)
    }
  }, [fileWatch])

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      onMouseEnter={() => enable !== false && editBox.onShow()}
      onMouseLeave={editBox.onClose}
      sx={{
        filter: 'drop-shadow(-3px 3px 50px rgba(0, 0, 0, 0.3))',
      }}
    >
      {(previewUploadImageUrl || src) && (
        <Image
          src={previewUploadImageUrl || src}
          alt={alt}
          fill
          sizes="100%"
          priority
          style={{ objectFit: 'cover', borderRadius }}
        />
      )}
      <Stack
        zIndex={1}
        display={editBox.show ? 'flex' : 'none'}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        bgcolor={alpha('#000', 0.6)}
        onClick={() => {
          uploadInputRef.current?.click()
        }}
        borderRadius={borderRadius}
      >
        <input
          type="file"
          name={field.name}
          ref={(r) => {
            uploadInputRef.current = r
            field.ref(r)
          }}
          accept="image/png, image/jpeg, image/gif"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) {
              field.onChange(e.target.files[0])
            }
            e.target.value = ''
          }}
        />
        <FileUploadOutlinedIcon style={{ fontSize: '90px' }} />
        <Typography variant="subtitle1">choose photo</Typography>
      </Stack>
    </Box>
  )
}

export default EditableImage
