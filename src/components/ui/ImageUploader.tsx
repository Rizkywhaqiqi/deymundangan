'use client'

import { useState, useCallback } from 'react'
import { uploadToImgBB } from '@/services/image-upload'
import { Upload, X, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  value?: string | null
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export default function ImageUploader({ value, onChange, label = 'Upload Image', placeholder = 'Paste URL gambar atau upload file' }: ImageUploaderProps) {
  const [url, setUrl] = useState(value || '')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      const result = await uploadToImgBB(file)
      setUrl(result.url)
      onChange(result.url)
    } catch {
      setError('Gagal upload gambar. Coba lagi.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    onChange(newUrl)
  }

  const handleClear = () => {
    setUrl('')
    onChange('')
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">
        {label}
      </label>

      {/* URL Input */}
      <input
        type="url"
        value={url}
        onChange={handleUrlChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors"
      />

      {/* File Upload Button */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs tracking-[0.1em] uppercase rounded-full cursor-pointer hover:bg-primary/20 transition-colors">
          <Upload size={14} />
          <span>Upload File</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {isUploading && (
          <span className="flex items-center gap-1 text-xs text-charcoal/50">
            <Loader2 size={14} className="animate-spin" />
            Uploading...
          </span>
        )}

        {url && !isUploading && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Preview */}
      {url && !isUploading && (
        <div className="mt-2">
          <img
            src={url}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border border-primary/10"
            onError={() => setError('Gambar tidak dapat dimuat')}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}