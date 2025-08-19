import { create } from 'zustand'

export const useCart = create((set,get)=>({
  items: [],
  add(product, qty=1) {
    const exists = get().items.find(i => i.product._id === product._id)
    if (exists) set({ items: get().items.map(i => i.product._id===product._id ? {...i, qty:i.qty+qty} : i) })
    else set({ items: [...get().items, { product, qty }] })
    localStorage.setItem('cart', JSON.stringify(get().items))
  },
  load(){ const s = localStorage.getItem('cart'); if (s) set({ items: JSON.parse(s) }) },
  remove(id){ set({ items: get().items.filter(i => i.product._id !== id) }); localStorage.setItem('cart', JSON.stringify(get().items)) },
  clear(){ set({ items: [] }); localStorage.removeItem('cart') },
  total(){ return get().items.reduce((s,i)=> s + (i.product.price * (1 - (i.product.discount||0)/100))*i.qty, 0) }
}))
