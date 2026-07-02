import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'

export function LoginPage() {
  const { signInWithOtp } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await signInWithOtp(email.trim())
    setSubmitting(false)
    if (error) {
      setError(error)
      return
    }
    setSent(true)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-stone-900">Restaurant Journal</h1>
        <p className="mt-1 text-sm text-stone-400">Sign in to log and browse your visits</p>

        {sent ? (
          <p className="mt-6 rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-600">
            Check <span className="font-medium text-stone-900">{email}</span> for a sign-in link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !email.trim()}
              className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send magic link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
