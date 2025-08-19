import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../lib/api'

export default function Review(){
  const { orderId } = useParams()
  const [f, setF] = useState({ name:'', rating:5, message:'' })

  const submit = async () => {
    await api.post('/api/testimonials', { ...f, orderId })
    alert('Thanks! Your review is submitted for approval.')
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold">Leave a Review</h1>
      <input className="mt-3 w-full border rounded-xl px-3 py-2" placeholder="Your Name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
      <input className="mt-3 w-full border rounded-xl px-3 py-2" type="number" min="1" max="5" placeholder="Rating (1-5)" value={f.rating} onChange={e=>setF({...f,rating:Number(e.target.value)})}/>
      <textarea className="mt-3 w-full border rounded-xl px-3 py-2" placeholder="Message" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/>
      <button className="btn mt-4" onClick={submit}>Submit</button>
    </div>
  )
}
