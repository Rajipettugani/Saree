import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Coupons(){
  const empty = { code:'', discountPct:10, active:true, sourceTag:'website' }
  const [list, setList] = useState([])
  const [form, setForm] = useState(empty)

  const load = async ()=>{ const {data}=await api.get('/api/coupons'); setList(data) }
  useEffect(()=>{ load() }, [])

  const save = async ()=>{ await api.post('/api/coupons', form); setForm(empty); load() }
  const del = async (id)=>{ if(confirm('Delete?')){ await api.delete(`/api/coupons/${id}`); load() } }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h3 className="font-bold mb-2">Create Coupon</h3>
        <input className="border rounded-xl px-3 py-2 w-full" placeholder="CODE" value={form.code} onChange={e=>setForm({...form,code:e.target.value})}/>
        <input className="border rounded-xl px-3 py-2 w-full mt-2" type="number" placeholder="Discount %" value={form.discountPct} onChange={e=>setForm({...form,discountPct:Number(e.target.value)})}/>
        <input className="border rounded-xl px-3 py-2 w-full mt-2" placeholder="Source Tag" value={form.sourceTag} onChange={e=>setForm({...form,sourceTag:e.target.value})}/>
        <div className="mt-2">
          <label><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Active</label>
        </div>
        <div className="mt-3"><button className="btn" onClick={save}>Create</button></div>
      </div>
      <div className="space-y-3">
        {list.map(c => (
          <div key={c._id} className="card p-4 flex items-center justify-between">
            <div><b>{c.code}</b> — {c.discountPct}% — {c.sourceTag}</div>
            <button className="btn !bg-red-600" onClick={()=>del(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
