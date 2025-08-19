import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useCart } from '../store/useCart'

export default function ProductDetails(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const cart = useCart()

  useEffect(()=>{ (async()=>{ const { data } = await api.get('/api/products/'+id); setP(data) })() }, [id])

  if (!p) return <p>Loading...</p>
  const price = p.price * (1 - (p.discount||0)/100)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card overflow-hidden">
        <img src={p.images?.[0] || 'https://via.placeholder.com/600x800?text=Shaivyah'} alt={p.name} className="w-full h-[480px] object-cover"/>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{p.name}</h1>
        <p className="text-gray-600 mt-2">{p.category} · {p.fabric} · {p.color}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl font-extrabold text-brand-700">₹{price.toFixed(0)}</span>
          {p.discount ? <span className="line-through text-gray-400">₹{p.price}</span> : null}
        </div>
        <p className="mt-4 text-gray-700">{p.description}</p>
        <button className="btn mt-6" onClick={()=>cart.add(p, 1)}>Add to Cart</button>
      </div>
    </div>
  )
}
