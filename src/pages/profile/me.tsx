import ArtistRegisterForm from '@/components/ArtistRegisterForm'
import Button from '@/components/Button'
import PremiumRegisterForm from '@/components/PremiumRegisterForm'
import ProfileContent from '@/components/ProfileContent'
import ProfileTitle from '@/components/ProfileTitle'
import { useShow } from '@/hooks/useShow'
import { usePlaylistByUserId } from '@/queries/usePlaylist'
import { useRoleProfile, useUserProfile } from '@/queries/useProfile'
import { Box, Divider, Stack, Typography } from '@mui/material'
const ButtonStyling = {
  width: '261px',
  height: '44px',
  textTransform: 'none',
}
const UpgradeAccount = () => {
  const upgradeToPremium = useShow()
  const upgradeToArtist = useShow()
  const userRole = useRoleProfile()
  const isPremium = userRole.data?.includes('premium')
  const isArtist = userRole.data?.includes('artist')
  if (isArtist && isPremium) return null
  return (
    <Box
      width="100%"
      px={3}
      py={4}
      sx={{
        borderRadius: '24px',
        bgcolor: 'container.main',
      }}
    >
      <Stack spacing={1.75}>
        <Typography variant="h3">Upgrade Account</Typography>
        <Divider />

        <Stack spacing={1.75}>
          {!isPremium && (
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="h5">
                Remove Ads (899 bath one time)
              </Typography>
              <Button
                sx={{ ...ButtonStyling }}
                text="Upgrade to Premium"
                variant="contained"
                textVariant="h5"
                onClick={upgradeToPremium.onShow}
                disabled={isPremium}
              />
              <PremiumRegisterForm
                show={upgradeToPremium.show}
                onClose={upgradeToPremium.onClose}
              />
            </Stack>
          )}
          {!isArtist && (
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="h5">Wanna be Artist</Typography>
              <Button
                sx={{ ...ButtonStyling }}
                variant="contained"
                textVariant="h5"
                text="Register"
                onClick={upgradeToArtist.onShow}
                disabled={isArtist}
              />
              <ArtistRegisterForm
                show={upgradeToArtist.show}
                onClose={upgradeToArtist.onClose}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

const Profile = () => {
  const userProfile = useUserProfile()
  const playlistFilter = !userProfile.isLoading
    ? userProfile.data?.roles.includes('artist')
      ? 'album'
      : 'playlist'
    : undefined
  const playlists = usePlaylistByUserId(userProfile.data?._id, playlistFilter)
  const numberOfPublicPlaylists = playlists.data?.length
  const numberOfFollowers = userProfile.data?.followerCount
  const numberOfFollowing = userProfile.data?.followingCount
  const isArtist = userProfile.data?.roles.includes('artist')
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100%"
      spacing={2.5}
    >
      <ProfileTitle
        profileName={userProfile.data?.username || ''}
        numberOfPublicPlaylists={numberOfPublicPlaylists || 0}
        numberOfFollowers={numberOfFollowers || 0}
        numberOfFollowing={numberOfFollowing || 0}
        profileImageUrl={userProfile.data?.profileImage || ''}
        isArtist={isArtist}
      />
      <UpgradeAccount />
      <ProfileContent userId={userProfile.data?._id} />
    </Stack>
  )
}
export default Profile
