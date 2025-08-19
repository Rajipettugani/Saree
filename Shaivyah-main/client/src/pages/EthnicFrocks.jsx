import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { api } from '../lib/api';

export default function EthnicFrocks() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/products?category=Ethnic Frocks');
      setList(data);
    })();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ethnic Frocks</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
