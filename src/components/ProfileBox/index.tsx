import { Tab, Box, Tabs, Stack } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useState } from 'react'
import PlaylistProfile from '@/components/ProfileBox/playlistsOrAlbumsBox'

interface ProfileBoxResponse {
  userId: string
  role: string
}

const ProfileBox = ({ userId, role }: ProfileBoxResponse) => {
  const [value, setValue] = useState('1')

  return (
    <Stack alignItems={'flex-start'} justifyContent={'flex-start'} padding={5}>
      <TabContext value={value}>
        <Box
          sx={{
            bgcolor: 'container.light',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
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
              sx={{ p: 0 }}
              wrapped
              label={role === 'user' ? 'Playlist' : 'Album'}
              onClick={() => setValue('1')}
              value="1"
            />
            <Tab
              sx={{ p: 0 }}
              wrapped
              label="Item Two"
              onClick={() => setValue('2')}
              value="2"
            />
            <Tab
              sx={{ p: 0 }}
              wrapped
              label="Item Three"
              onClick={() => setValue('3')}
              value="3"
            />
          </Tabs>
        </Box>
        <TabPanel sx={{ p: 0 }} value="1">
          <PlaylistProfile userId={userId} role={role} />
        </TabPanel>
        <TabPanel value="2">TODO: follower list</TabPanel>
        <TabPanel value="3">TODO: following list</TabPanel>
      </TabContext>
    </Stack>
  )
}

export default ProfileBox
