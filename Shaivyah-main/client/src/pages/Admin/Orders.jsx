import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Orders(){
  const [list, setList] = useState([])
  const load = async ()=>{ const {data}=await api.get('/api/orders'); setList(data) }
  useEffect(()=>{ load() }, [])

  const setStatus = async (id,status)=>{ await api.put(`/api/orders/${id}/status`, { status }); load() }

  return (
    <div className="space-y-3">
      {list.map(o => (
        <div key={o._id} className="card p-4">
          <div className="font-semibold">#{o._id} — ₹{o.total} — {o.paymentMethod} ({o.paymentStatus})</div>
          <div className="text-sm text-gray-600">{o.shippingAddress?.name} · {o.shippingAddress?.city}</div>
          <div className="mt-2 flex gap-2">
            {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
              <button key={s} className={`btn !px-3 ${o.status===s?'!bg-brand-700':''}`} onClick={()=>setStatus(o._id,s)}>{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
