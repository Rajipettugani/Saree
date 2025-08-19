import { useCart } from '../store/useCart'
import { api } from '../lib/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Checkout(){
  const cart = useCart()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const [addr, setAddr] = useState({ name:'', phone:'', address:'', city:'Hyderabad', state:'', pincode:'' })
  const [coupon, setCoupon] = useState({ code: params.get('coupon') || '', discountPct: 0 })
  const [onlineOnly, setOnlineOnly] = useState(false)

  useEffect(()=>{ cart.load() },[])
  useEffect(()=>{
    setOnlineOnly(addr.city.trim().toLowerCase() !== 'hyderabad')
  },[addr.city])

  const totalBefore = cart.total()
  const total = totalBefore * (1 - (coupon.discountPct||0)/100)

  const applyCoupon = async () => {
    const { data } = await api.get('/api/coupons')
    const found = data.find(c => c.code.toLowerCase() === coupon.code.toLowerCase())
    if (found) setCoupon({ code: found.code, discountPct: found.discountPct })
    else alert('Invalid coupon')
  }

  const createOrder = async (paymentMethod) => {
    const order = {
      items: cart.items.map(i=>({ product: i.product._id, qty: i.qty, price: i.product.price })),
      total, city: addr.city, paymentMethod,
      shippingAddress: addr
    }
    const { data } = await api.post('/api/orders', order)
    return data
  }

  const handleCOD = async () => {
    const ord = await createOrder('COD')
    cart.clear()
    alert('Order placed with COD! #' + ord._id)
    nav(`/review/${ord._id}`)
  }

  const handleOnline = async () => {
    const ord = await createOrder('Online')
    // create RZP order
    const { data } = await api.post('/api/payment/razorpay/order', { orderId: ord._id })
    const options = {
      key: data.key,
      amount: data.rzpOrder.amount,
      currency: 'INR',
      name: 'Shaivyah',
      description: 'Order Payment',
      order_id: data.rzpOrder.id,
      handler: async function () {
        await api.post('/api/payment/razorpay/confirm', { orderId: ord._id })
        cart.clear()
        alert('Payment successful! Order #' + ord._id)
        nav(`/review/${ord._id}`)
      },
      prefill: { name: addr.name, contact: addr.phone }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card p-6">
        <h2 className="text-xl font-bold">Shipping Address</h2>
        {['name','phone','address','city','state','pincode'].map(k=> (
          <input key={k} placeholder={k} value={addr[k]} onChange={e=>setAddr({...addr,[k]:e.target.value})} className="mt-3 w-full border rounded-xl px-3 py-2" />
        ))}

        <div className="mt-6">
          <h3 className="font-semibold">Apply Coupon</h3>
          <div className="flex gap-2 mt-2">
            <input value={coupon.code} onChange={e=>setCoupon({...coupon, code:e.target.value})} className="border rounded-xl px-3 py-2 flex-1" placeholder="Enter code"/>
            <button className="btn" onClick={applyCoupon}>Apply</button>
          </div>
          {coupon.discountPct>0 && <p className="text-green-700 mt-2">Applied {coupon.code} (-{coupon.discountPct}%)</p>}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <p className="mt-2">Items: {cart.items.length}</p>
        <p className="mt-2">Subtotal: ₹{totalBefore.toFixed(0)}</p>
        <p className="mt-2 font-bold">Total: ₹{total.toFixed(0)}</p>

        <div className="mt-4 space-x-3">
          {!onlineOnly && (
            <button className="btn" onClick={handleCOD}>Cash on Delivery</button>
          )}
          <button className="btn" onClick={handleOnline}>Pay Online</button>
        </div>
        {onlineOnly && <p className="text-sm text-gray-500 mt-2">Outside Hyderabad, online payment is required.</p>}
      </div>
    </div>
  )
}
