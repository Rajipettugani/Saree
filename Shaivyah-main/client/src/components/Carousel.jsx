import { useEffect, useState } from 'react'

const slides = [
  { id:1, url:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4c56b820-0e2a-43bd-938a-61bdda4cc96d/db38ynq-30304abf-f9f7-43d2-9dee-10756613a032.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRjNTZiODIwLTBlMmEtNDNiZC05MzhhLTYxYmRkYTRjYzk2ZFwvZGIzOHlucS0zMDMwNGFiZi1mOWY3LTQzZDItOWRlZS0xMDc1NjYxM2EwMzIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RjrtxYUyTAS2ZbI2R_Nb4_VY2Xrxaf2AyPVlVgpmAlY' },
  { id:2, url:'https://www.chinayabanaras.com/cdn/shop/articles/Blog_Banner_-260923-_Festive_wear_sarees_by_Chinaya_Banaras.jpg?v=1695712882' },
  { id:3, url:'https://byshree.com/cdn/shop/articles/Banner-1.jpg?v=1667985708&width=2048' }
]

export default function Carousel(){
  const [i,setI] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%slides.length), 3000)
    return ()=> clearInterval(t)
  },[])
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-soft w-full" style={{height:'360px', minHeight:'360px'}}>
      {slides.map((s,idx)=>(
        <img key={s.id} src={s.url} alt="carousel" className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${i===idx?'opacity-100':'opacity-0'}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-3xl font-extrabold">Where tradition meets modern grace India</h2>
      </div>
    </div>
  )
}
