import { http } from '@/services/apiAxios'

interface UploadMusicData {
  musicName: string
  albumId: string
  musicFile: File
  musicCover: File
  genre: string
}

const uploadMusic = async (data: UploadMusicData) => {
  const formData = new FormData()
  formData.append('name', data.musicName)
  formData.append('description', 'this is sound of dek wat')
  formData.append('albumId', data.albumId)
  formData.append('music', data.musicFile)
  formData.append('coverImage', data.musicCover)
  formData.append('genre', data.genre)
  await http.post('users/musics', formData)
}

export { uploadMusic }
