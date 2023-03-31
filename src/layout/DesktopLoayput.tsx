import Navbar from '@/components/Navbar/Navbar'
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box display="flex" minHeight="100vh">
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
          background:
            'linear-gradient(180deg, rgba(2,49,105,1), 20%, rgba(4,4,47,1) 80%)',
        }}
      >
        <Box position="relative" width="100%" height="100%" pb={'128px'}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default DesktopLayout
