import { useState } from 'react'
import { Link } from 'react-router-dom'

const PasswordResetForm = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add password reset submission logic here
    console.log('Reset password to', password)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-slate-100 shadow-lg shadow-slate-900/10">
            <span className="text-2xl font-semibold">PF</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-500">
            Choose a strong new password and confirm it to regain access to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              New password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Create a new password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Re-enter your new password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            Reset password
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Back to{' '}
            <Link to="/" className="font-medium text-slate-900 hover:text-slate-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetForm;   