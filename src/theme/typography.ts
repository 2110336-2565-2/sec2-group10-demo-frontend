import { Theme, TypographyVariant } from '@mui/material'
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'

const typographyOptions: Record<string, TypographyStyleOptions> = {
  h1: {
    fontWeight: 600,
    fontSize: 56,
    lineHeight: 62,
    letterSpacing: -1.5,
  },
  h2: {
    fontWeight: 600,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  h3: {
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: 0,
  },
  h4: {
    fontWeight: 600,
    fontSize: 25,
    lineHeight: 28,
    letterSpacing: 0.25,
  },
  h5: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0,
  },
  h6: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  body1: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.15,
  },
  body2: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  caption: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 13,
    letterSpacing: 0.4,
  },
}

const overrideMuiTypography = (theme: Theme) => {
  const { typography } = theme
  const { pxToRem } = typography

  const convertToRem = (options: TypographyStyleOptions) => {
    if (typeof options.fontSize === 'number') {
      options.fontSize = pxToRem(options.fontSize)
    }

    if (typeof options.lineHeight === 'number') {
      options.lineHeight = pxToRem(options.lineHeight)
    }
  }

  Object.keys(typographyOptions).forEach((key) => {
    const variant = key as TypographyVariant
    const style = typographyOptions[variant]
    convertToRem(style)
    Object.assign(typography[variant], style)
  })
  return theme
}

export { overrideMuiTypography }
