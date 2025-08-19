import { useEffect, useState } from 'react'
import { api, setAuthToken } from '../../lib/api'
import { useAuth } from '../../store/useAuth'
import Products from './Products'
import Categories from '../Categories01'
import Gallery from './Gallery'
import Orders from './Orders'
import Coupons from './Coupons'
import Testimonials from './Testimonials'

export default function Dashboard(){
  const [tab, setTab] = useState('products')
  const { token } = useAuth()
  useEffect(()=>{ setAuthToken(token) }, [token])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-2 flex-wrap">
        {['products','categories','gallery','orders','coupons','testimonials'].map(t => (
          <button key={t} className={`btn !px-3 ${tab===t?'!bg-brand-700':''}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
      {tab==='products' && <Products />}
      {tab==='categories' && <Categories />}
      {tab==='gallery' && <Gallery />}
      {tab==='orders' && <Orders />}
      {tab==='coupons' && <Coupons />}
      {tab==='testimonials' && <Testimonials />}
    </div>
  )
}
