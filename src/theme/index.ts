import {
  createTheme,
  PaletteOptions,
  Shadows,
  ThemeOptions,
} from '@mui/material'
import { overrideMuiTypography } from './typography'
import createCache from '@emotion/cache'

declare module '@mui/material/styles' {
  interface Palette {
    container: {
      main: string
    }
  }
  interface PaletteOptions {
    container: {
      main: string
    }
  }
}

const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#3f3fe4',
    light: '#6565e9',
    dark: '#2c2c9f',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2e92df',
    light: '#57a7e5',
    dark: '#20669c',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#C2C2FF',
  },
  success: {
    main: '#19CC95',
    dark: '#11AF7F',
  },
  warning: {
    main: '#FFA726',
  },
  error: {
    main: '#E43030',
  },
  info: {
    main: '#2E91DF',
  },
  divider: '#FFFFFF',
  background: {
    default: '#04042F',
  },
  container: {
    main: '#0D173C',
  },
}

const shadows: Shadows = Array(25).fill('none') as Shadows

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Comfortaa', 'Noto Sans Thai', 'sans-serif'].join(','),
  },
  palette: palette,
  shadows: shadows,
}

const buildTheme = (themeOptions: ThemeOptions) => {
  let theme = createTheme(themeOptions)
  theme = overrideMuiTypography(theme)
  return theme
}

export function createEmotionCache() {
  let insertionPoint

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}

export const theme = buildTheme(themeOptions)
