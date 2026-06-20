import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add password reset request logic here
    console.log('Requesting password reset for', email)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-slate-100 shadow-lg shadow-slate-900/10">
            <span className="text-2xl font-semibold">PF</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Forgot your password?</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we&apos;ll send you a secure link to reset your password.
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

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Remembered your password?{' '}
            <Link to="/" className="font-medium text-slate-900 hover:text-slate-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordForm;      