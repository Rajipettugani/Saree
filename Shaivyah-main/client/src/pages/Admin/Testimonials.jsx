import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Testimonials(){
  const [list, setList] = useState([])
  const load = async ()=>{ const {data}=await api.get('/api/testimonials/admin'); setList(data) }
  useEffect(()=>{ load() }, [])

  const setStatus = async (id,status)=>{ await api.put(`/api/testimonials/${id}/status`, { status }); load() }

  return (
    <div className="space-y-3">
      {list.map(t => (
        <div key={t._id} className="card p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">{t.name} — {'★'.repeat(t.rating||5)}</div>
            <div className="text-sm text-gray-600">{t.message}</div>
            <div className="text-xs text-gray-400">Status: {t.status}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={()=>setStatus(t._id,'approved')}>Approve</button>
            <button className="btn !bg-red-600" onClick={()=>setStatus(t._id,'rejected')}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}
