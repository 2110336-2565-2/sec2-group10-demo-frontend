import { Tab, Box } from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import { useState } from 'react'

const ProfileBox = () => {
  const [value, setValue] = useState('1')

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label="lab API tabs example">
            <Tab label="Item One" onClick={() => setValue('1')} value="1" />
            <Tab label="Item Two" onClick={() => setValue('2')} value="2" />
            <Tab label="Item Three" onClick={() => setValue('3')} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">TODO: all playlist</TabPanel>
        <TabPanel value="2">TODO: follower list</TabPanel>
        <TabPanel value="3">TODO: following list</TabPanel>
      </TabContext>
    </>
  )
}

export default ProfileBox
