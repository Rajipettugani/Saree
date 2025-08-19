import { Link } from 'react-router-dom'

export default function ProductCard({ p }){
  const price = p.price * (1 - (p.discount||0)/100)
  const img = p.images?.[0] || 'https://via.placeholder.com/400x500?text=Shaivyah'
  return (
    <Link to={`/product/${p._id}`} className="card overflow-hidden group">
      <img src={img} alt={p.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{p.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{p.category} · {p.fabric||'Fabric'}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold">₹{price.toFixed(0)}</span>
          {p.discount ? <span className="text-xs line-through text-gray-400">₹{p.price}</span> : null}
        </div>
      </div>
    </Link>
  )
}
