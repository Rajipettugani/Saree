import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
export default function AdminGuard({ children }){
  const { user } = useAuth()
  if (!user || user.role!=='admin') return <Navigate to="/admin/login" />
  return children
}
