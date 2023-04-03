import MusicPlayer from '@/components/MusicPlayer'
import DesktopLayout from '@/layout/DesktopLoayput'
import { HttpProvider } from '@/services/apiAxios'
import '@/styles/globals.css'
import { createEmotionCache, theme } from '@/theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <SnackbarProvider
            maxSnack={5}
            autoHideDuration={2500}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <HttpProvider>
              <CssBaseline />
              <DesktopLayout>
                <Component {...pageProps} key={props.router.asPath} />
                <MusicPlayer />
              </DesktopLayout>
            </HttpProvider>
          </SnackbarProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
