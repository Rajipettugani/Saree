// import { useEffect, useState } from 'react'
// import { api } from '../lib/api'
// import ProductCard from '../components/ProductCard'
// import Carousel from '../components/Carousel'
// import OfferBanner from '../components/OfferBanner'
// import TestimonialCarousel from '../components/TestimonialCarousel'

// export default function Home(){
//   const [products,setProducts] = useState([])
//   const [coupon,setCoupon] = useState(null)
//   const [testimonials,setTestimonials] = useState([])

//   useEffect(()=>{
//     (async()=>{
//       const p = await api.get('/api/products?q=saree')
//       setProducts(p.data.slice(0,6))
//       const c = await api.get('/api/coupons')
//       setCoupon(c.data?.[0])
//       const t = await api.get('/api/testimonials')
//       setTestimonials(t.data.slice(0,3))
//     })()
//   },[])

//   return (
//     <div className="space-y-10">
//       <Carousel />
//       <OfferBanner coupon={coupon} />

//       <section>
//         <h2 className="text-2xl font-bold mb-4">Trending Sarees</h2>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map(p => <ProductCard key={p._id} p={p} />)}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-bold mb-4">What customers say</h2>
//         <TestimonialCarousel items={testimonials} />
//       </section>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import OfferBanner from '../components/OfferBanner'
import TestimonialCarousel from '../components/TestimonialCarousel'

export default function Home(){
  const [sarees,setSarees] = useState([])
  const [kurtis,setKurtis] = useState([])
  const [kurtiSets,setKurtiSets] = useState([])
  const [ethnicFrocks,setEthnicFrocks] = useState([])
  const [coupon,setCoupon] = useState(null)
  const [testimonials,setTestimonials] = useState([])

  useEffect(()=>{
    (async()=>{

  const sareeRes = await api.get('/api/products?category=Sarees')
  setSarees(sareeRes.data)

  const kurtiRes = await api.get('/api/products?category=Kurtis')
  setKurtis(kurtiRes.data)

  const kurtiSetRes = await api.get('/api/products?category=Kurti Sets')
  setKurtiSets(kurtiSetRes.data)

  const frockRes = await api.get('/api/products?category=Ethnic Frocks')
  setEthnicFrocks(frockRes.data)

      const c = await api.get('/api/coupons')
      setCoupon(c.data?.[0])

      const t = await api.get('/api/testimonials')
      setTestimonials(t.data.slice(0,3))
    })()
  },[])

  return (
    <div className="space-y-16">

      {/* HERO / Carousel */}
      <div className="border-4 border-brand-700 bg-white rounded-2xl shadow-lg mb-8">
        <Carousel />
      </div>

      {/* OFFER BANNER */}
      <OfferBanner coupon={coupon} />

      {/* SAREES */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">Trending Sarees</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sarees.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>

      {/* KURTIS */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">Elegant Kurtis</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kurtis.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>

      {/* KURTI SETS */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">Kurti Sets</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kurtiSets.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>

      {/* ETHNIC FROCKS */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">Ethnic Frocks</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ethnicFrocks.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">What Customers Say</h2>
        <TestimonialCarousel items={testimonials} />
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif font-bold text-lg mb-2">Shaivyah</h4>
            <p className="text-sm text-gray-600">
              Shaivyah offers a stunning collection of sarees, kurtis, and more, blending tradition with modern style.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg mb-2">Links</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg mb-2">Follow Us</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg mb-2">Address</h4>
            <p className="text-sm text-gray-600">
              123 Street<br />City-State 12345<br />+123-456 7830
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
