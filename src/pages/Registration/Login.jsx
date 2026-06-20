import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../../config'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const toastTimeout = useRef(null)

  useEffect(() => {
    return () => {
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current)
      }
    }
  }, [])

  const showToast = (message) => {
    setToastMessage(message)
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current)
    }
    toastTimeout.current = setTimeout(() => {
      setToastMessage('')
    }, 3500)
  }

  const showSuccessToast = (message) => {
    setSuccessMessage(message)
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current)
    }
    toastTimeout.current = setTimeout(() => {
      setSuccessMessage('')
    }, 3500)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const url  = `${API_BASE_URL}/api/login`
    console.log('Login URL:', url)
    try {

        const response = await axios.post(
       url,
       { 
        email: email,
        password: password,
       }, 
        {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json', 
          },
          withCredentials: true,
        }
    )
    
    if (response.status === 200) {
      showSuccessToast('Login successful!')
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    }

    } catch (error) {
      const status = error.response?.status
      console.log('Status code:', status)

      if (status === 401) {
        showToast('Invalid email or password. Please try again.')
      }else{
        showToast('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

      {toastMessage && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto max-w-md px-4">
          <div className="text-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 shadow-lg shadow-rose-900/10">
            {toastMessage}
          </div>
        </div>
      )}
      {successMessage && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto max-w-md px-4">
          <div className="text-center rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900 shadow-lg shadow-green-900/10">
            {successMessage}
          </div>
        </div>
      )}
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-slate-100 shadow-lg shadow-slate-900/10">
            <span className="text-2xl font-semibold">PF</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to your account to manage products, purchases, sales and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <Link to="/forget-password" className="font-medium text-slate-900 hover:text-slate-700">
              Forgot password?
            </Link>
            <span className="text-slate-400">•</span>
            
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            Sign in
          </button>
        </form>

        <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-center text-sm text-slate-500 shadow-inner shadow-slate-100">
          <p>
            New here?{' '}
            <span className="font-medium text-slate-900">
              <Link to="/registration" className="font-medium text-slate-900 hover:text-slate-700">
                Register now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login