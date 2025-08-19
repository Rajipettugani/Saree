import { useForm } from 'react-hook-form'
import { useAuth } from '../../store/useAuth'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const nav = useNavigate()
  const onSubmit = async ({ email, password }) => {
    await login(email, password)
    nav('/admin')
  }
  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <input className="border rounded-xl w-full px-3 py-2" placeholder="Email" {...register('email')} />
        <input className="border rounded-xl w-full px-3 py-2" placeholder="Password" type="password" {...register('password')} />
        <button className="btn w-full">Login</button>
      </form>
    </div>
  )
}
