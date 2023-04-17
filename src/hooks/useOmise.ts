import { useCallback, useEffect, useState } from 'react'
import { Omise } from 'omise-js-typed'

import { OMISE_PUBLIC_KEY } from '@/configs'

const isBrowser = typeof window !== 'undefined'

const OMISE_SCRIPT_URL = 'https://cdn.omise.co/omise.js'

const loadOmiseScript = (omiseScriptUrl: string) => {
  if (!isBrowser) return Promise.resolve()

  const omise = window.Omise

  const isOmiseLoaded = typeof omise !== 'undefined'

  if (isOmiseLoaded) {
    return Promise.resolve()
  }

  const scriptElements = document.querySelectorAll(
    `script[src*="${omiseScriptUrl}"]`
  )

  if (scriptElements && scriptElements.length > 0) {
    return new Promise<void>((resolve) => {
      if (isOmiseLoaded) return resolve()
      scriptElements[0].addEventListener('load', () => resolve())
    })
  }

  const el = document.createElement('script')
  el.src = omiseScriptUrl

  document.body.appendChild(el)

  return new Promise<void>((resolve) => {
    el.addEventListener('load', () => resolve())
  })
}

interface UseOmiseOptions {
  omiseScriptUrl?: string
  publicKey?: string
}

const useOmise = (options?: UseOmiseOptions) => {
  const [omise, setOmise] = useState<Omise>()

  const { publicKey = OMISE_PUBLIC_KEY, omiseScriptUrl = OMISE_SCRIPT_URL } =
    options || {}

  const handleLoadScript = useCallback(
    () => loadOmiseScript(omiseScriptUrl),
    [omiseScriptUrl]
  )

  useEffect(() => {
    const buildService = () => {
      const omise = window.Omise

      if (!omise) return console.error('Omise has not been found.')

      // config omise
      omise.setPublicKey(publicKey)

      // set omise
      setOmise(omise)
    }

    if (publicKey) {
      handleLoadScript().then(() => buildService())
    } else {
      console.error('Omise public key is not found.')
    }
  }, [])

  return { omise }
}

export { useOmise }
