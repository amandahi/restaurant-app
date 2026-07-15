import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export function ResetPasswordPage() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)
    const { error } = await updatePassword(password)
    setSubmitting(false)
    if (error) {
      setError(error)
      return
    }
    setDone(true)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-stone-900">Restaurant Journal</h1>
        <p className="mt-1 text-sm text-stone-400">Set a new password</p>

        {done ? (
          <div className="mt-6 space-y-3">
            <p className="rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-600">Your password has been updated.</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white"
            >
              Go to Restaurant Journal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              autoFocus
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !password.trim() || !confirmPassword.trim()}
              className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Set new password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
