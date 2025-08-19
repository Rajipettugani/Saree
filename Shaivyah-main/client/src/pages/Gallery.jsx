import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Gallery(){
  const [imgs, setImgs] = useState([])
  useEffect(()=>{ (async()=>{ const { data } = await api.get('/api/gallery'); setImgs(data) })() }, [])
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map(img => (
          <img key={img._id} src={img.imageUrl} alt={img.title||''} className="w-full h-64 object-cover rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
