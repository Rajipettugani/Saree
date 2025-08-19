import { useState } from 'react'
import { api } from '../lib/api'

export default function Uploader({ onUploaded }){
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const upload = async () => {
    if (!files.length) return
    const fd = new FormData()
    files.forEach(f => fd.append('images', f))
    setLoading(true)
    const { data } = await api.post('/api/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setLoading(false)
    onUploaded?.(data.urls)
  }
  return (
    <div className="flex items-center gap-3">
      <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files))} />
      <button type="button" onClick={upload} className="btn">{loading?'Uploading...':'Upload'}</button>
    </div>
  )
}
