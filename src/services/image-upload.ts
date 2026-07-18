// Image upload service using imgbb (free image hosting)

const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY' // Ganti dengan API key dari imgbb

export interface UploadResult {
  url: string
  delete_url?: string
}

export async function uploadToImgBB(file: File): Promise<UploadResult> {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('key', IMGBB_API_KEY)

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    
    if (data.success) {
      return {
        url: data.data.url,
        delete_url: data.data.delete_url,
      }
    } else {
      throw new Error(data.error?.message || 'Upload failed')
    }
  } catch (error) {
    console.error('Error uploading to imgbb:', error)
    throw error
  }
}

export async function uploadFromUrl(url: string): Promise<UploadResult> {
  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        key: IMGBB_API_KEY,
        image: url,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to upload image from URL')
    }

    const data = await response.json()
    
    if (data.success) {
      return {
        url: data.data.url,
        delete_url: data.data.delete_url,
      }
    } else {
      throw new Error(data.error?.message || 'Upload failed')
    }
  } catch (error) {
    console.error('Error uploading from URL:', error)
    throw error
  }
}