import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface Music {
  name: string
  artist: string
  coverImage: string
  source: string
}

// mock musics
const musics: Music[] = [
  {
    name: 'เสแสร้ง (Pretend) [feat. Moon]',
    artist: 'Paper Planes',
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/01+%E0%B9%80%E0%B8%AA%E0%B9%81%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%87+(Pretend)+%5Bfeat.+Moon%5D+-+Paper+Planes.mp3',
  },
  {
    name: 'ซ้ำซ้ำ',
    artist: 'Paper Planes',
    coverImage: 'https://picsum.photos/200/300',
    source:
      'https://demo-by-tuder-sound-bucket.s3.ap-southeast-1.amazonaws.com/02+%E0%B8%8B%E0%B9%89%E0%B8%B3%E0%B8%8B%E0%B9%89%E0%B8%B3.m4a',
  },
]

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
export const playlistsAtom = atom<Music[]>(musics)
export const indexAtom = atom(0)
export const musicAtom = atom((get) => {
  const index = get(indexAtom)
  const playlists = get(playlistsAtom)
  return playlists[index]
})
export const autoPlayAtom = atom(false)

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
  (get, set, play) => {
    const playlists = get(playlistsAtom)
    set(autoPlayAtom, play)
    set(indexAtom, (index) => safeIndex(index + 1, playlists.length))
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
    set(autoPlayAtom, play)
    set(indexAtom, (index) => safeIndex(index - 1, playlists.length))
  }
)

/**
 * Set playlists and play the first music
 * @param playlists - Array of music
 * @param play - Play the first music or not
 * @returns
 * @example
 * const [, setPlaylists] = useAtom(setPlaylistsAtom)
 * setPlaylists([music1, music2], true)
 * setPlaylists([music1, music2], false)
 */
export const setPlaylistsAtom = atom<null, [Music[], boolean], void>(
  null,
  (_get, set, playlists, play) => {
    set(autoPlayAtom, play)
    set(playlistsAtom, playlists)
    set(indexAtom, 0)
  }
)
