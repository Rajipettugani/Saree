import { useCart } from '../store/useCart'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart(){
  const cart = useCart()
  useEffect(()=>{ cart.load() },[])
  const total = cart.total()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cart.items.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="space-y-3">
          {cart.items.map(({product, qty}) => (
            <div key={product._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={product.images?.[0]||'https://via.placeholder.com/80'} alt="" className="w-20 h-20 object-cover rounded-xl"/>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {qty}</p>
                </div>
              </div>
              <button className="text-red-600" onClick={()=>cart.remove(product._id)}>Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Total: ₹{total.toFixed(0)}</span>
            <Link to="/checkout" className="btn">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
