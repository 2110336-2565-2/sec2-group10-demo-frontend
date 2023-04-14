import { getRandomAdsMusic } from '@/queries/useRandomMusics'
import { getProbability } from '@/utils'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export interface Music {
  musicId: string
  name: string
  albumId: string
  coverImage: string
  url: string
  ownerId: string
  duration: number
  albumName: string
  ownerName: string
}

const safeIndex = (index: number, length: number) => {
  if (index < 0) {
    return length - 1
  } else if (index >= length) {
    return 0
  } else {
    return index
  }
}

export const volumeAtom = atomWithStorage('volume', 50)
export const playlistsAtom = atom<Music[]>([])
export const indexAtom = atom(0)
export const musicAtom = atom<Music | undefined>(undefined)
export const autoPlayAtom = atom(false)
export const isPlayAdsAtom = atom(false)
export const isPremiumAtom = atom(false)

/**
 * Play the next music
 * @param play - Play the next music or not
 * @returns
 * @example
 * const [, skipNext] = useAtom(skipNextAtom)
 * skipNext(true)
 * skipNext(false)
 */
export const skipNextAtom = atom<null, [boolean], void>(
  null,
  async (get, set, play) => {
    if (!get(isPremiumAtom) && getProbability(0.2) && !get(isPlayAdsAtom)) {
      set(isPlayAdsAtom, true)
      set(autoPlayAtom, true)
      set(musicAtom, await getRandomAdsMusic())
    } else {
      const playlists = get(playlistsAtom)
      const nextIndex = safeIndex(get(indexAtom) + 1, playlists.length)
      set(autoPlayAtom, play)
      set(indexAtom, nextIndex)
      set(musicAtom, playlists[nextIndex])
      set(isPlayAdsAtom, false)
    }
  }
)

/**
 * Skip to previous music
 * @param play - Play the previous music or not
 * @returns
 * @example
 * const [, skipPrevious] = useAtom(skipPreviousAtom)
 * skipPrevious(true)
 * skipPrevious(false)
 */
export const skipPreviousAtom = atom<null, [boolean], void>(
  null,
  (get, set, play) => {
    const playlists = get(playlistsAtom)
    const prevIndex = safeIndex(get(indexAtom) - 1, playlists.length)
    set(autoPlayAtom, play)
    set(indexAtom, prevIndex)
    set(musicAtom, playlists[prevIndex])
  }
)

/**
 * Set playlists and play the first music
 * @param playlists - Array of music
 * @param options - Options
 * @returns
 * @example
 * const [, setPlaylists] = useAtom(setPlaylistsAtom)
 * setPlaylists(playlists, { playNow: true, startIndex: 0 })
 * setPlaylists(playlists, { playNow: false, startIndex: 0 })
 * setPlaylists(playlists, { playNow: true, startIndex: 1 })
 */
interface SetPlaylistsOptions {
  playNow?: boolean
  startIndex?: number
}
export const setPlaylistsAtom = atom<
  null,
  [Music[], SetPlaylistsOptions],
  void
>(null, (get, set, playlists, options) => {
  const { playNow = true, startIndex = 0 } = options
  if (get(isPlayAdsAtom)) return
  set(autoPlayAtom, playNow)
  set(playlistsAtom, playlists)
  set(indexAtom, startIndex)
  set(musicAtom, playlists[startIndex])
})
