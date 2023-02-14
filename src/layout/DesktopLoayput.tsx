import Navbar from '@/components/Navbar/Navbar'
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box display="flex" height="100vh">
      <Navbar />
      <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>{children}</Box>
    </Box>
  )
}

export default DesktopLayout
