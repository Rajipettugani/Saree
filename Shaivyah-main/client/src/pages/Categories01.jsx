import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Categories01() {
	const [list, setList] = useState([])
	const [form, setForm] = useState(null)
	useEffect(() => {
		(async () => {
			const { data } = await api.get('/api/products')
			setList(data)
		})()
	}, [])

	const del = async (id) => {
		if (confirm('Delete?')) {
			await api.delete(`/api/products/${id}`)
			setList(list.filter(p => p._id !== id))
		}
	}

	return (
		<div className="space-y-8">
			{['Sarees','Kurtis','Kurti Sets','Ethnic Frocks','Other'].map(cat => (
				<div key={cat}>
					<h2 className="text-xl font-bold mb-2">{cat}</h2>
					<div className="space-y-3">
						{list.filter(p => p.category === cat).map(p => (
							<div key={p._id} className="card p-4 flex items-center justify-between">
								<div className="flex items-center gap-4">
									<img src={p.images?.[0]||'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded-xl"/>
									<div>
										<div className="font-semibold">{p.name}</div>
										<div className="text-sm text-gray-500">₹{p.price} · {p.category}</div>
									</div>
								</div>
								<div className="flex gap-2">
									<button className="btn" onClick={()=>setForm(p)}>Edit</button>
									<button className="btn !bg-red-600" onClick={()=>del(p._id)}>Delete</button>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
