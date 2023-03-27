import { Tab, Box, Tabs, Stack } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useState } from 'react'
import PlaylistProfile from '@/components/ProfileBox/playlistsOrAlbumsBox'
const ProfileBox = () => {
  const [value, setValue] = useState('1')

  return (
    <Stack alignItems={'flex-start'} justifyContent={'flex-start'}>
      <TabContext value={value}>
        <Box sx={{ bgcolor: 'container.light', borderRadius: 2 }}>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="secondary"
            sx={{
              bgcolor: 'container',
              borderRadius: 3,
            }}
          >
            <Tab
              wrapped
              label="Item One"
              onClick={() => setValue('1')}
              value="1"
            />
            <Tab
              wrapped
              label="Item Two"
              onClick={() => setValue('2')}
              value="2"
            />
            <Tab
              wrapped
              label="Item Three"
              onClick={() => setValue('3')}
              value="3"
            />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <PlaylistProfile />
        </TabPanel>
        <TabPanel value="2">TODO: follower list</TabPanel>
        <TabPanel value="3">TODO: following list</TabPanel>
      </TabContext>
    </Stack>
  )
}

export default ProfileBox
