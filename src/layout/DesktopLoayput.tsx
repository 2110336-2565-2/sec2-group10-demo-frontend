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
            'linear-gradient(180deg, rgba(0,97,166,1) 0%, 8%, rgba(4,4,47,1) 68%)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default DesktopLayout
