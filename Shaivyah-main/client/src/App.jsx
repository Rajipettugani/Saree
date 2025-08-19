import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Categories from './pages/Categories01'
import Sarees from './pages/Sarees'
import Kurtis from './pages/Kurtis'
import KurtiSets from './pages/KurtiSets'
import EthnicFrocks from './pages/EthnicFrocks'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Gallery from './pages/Gallery'
import Review from './pages/Review'
import AdminLogin from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import AdminCategories from './pages/Admin/Categories'
import AdminGuard from './components/AdminGuard'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:name" element={<Categories />} />
          <Route path="/sarees" element={<Sarees />} />
          <Route path="/kurtis" element={<Kurtis />} />
          <Route path="/kurti-sets" element={<KurtiSets />} />
          <Route path="/ethnic-frocks" element={<EthnicFrocks />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/review/:orderId" element={<Review />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><Dashboard /></AdminGuard>} />
          <Route path="/admin/categories" element={<AdminGuard><AdminCategories /></AdminGuard>} />
        </Routes>
      </main>
  {/* <Footer /> removed for Home page custom footer */}
    </div>
  )
}
