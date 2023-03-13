import { Howl, HowlOptions } from 'howler'
import { useCallback, useEffect, useState } from 'react'

interface UseSoundOptions {
  volume?: number
  onend?: () => void
}

const defaultHowlOptions: HowlOptions = {
  src: '',
  html5: true,
}

const useSound = (src?: string, options?: UseSoundOptions) => {
  const { volume, onend } = options || {}
  const [sound, setSound] = useState<Howl>()
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if (!src) return

    const howl = new Howl({
      ...defaultHowlOptions,
      src,
      volume,
      onend,
      onload: function (this: Howl) {
        setDuration(this.duration() * 1000)
      },
    })

    setSound(howl)

    return () => {
      howl.unload()
    }
  }, [src])

  useEffect(() => {
    if (!sound || typeof volume != 'number') return
    sound.volume(volume)
  }, [volume])

  const play = useCallback(() => {
    sound?.play()
  }, [sound])

  const pause = useCallback(() => {
    sound?.pause()
  }, [sound])

  const stop = useCallback(() => {
    sound?.stop()
  }, [sound])

  return [play, { pause, duration, sound, stop }] as const
}

export { useSound }
