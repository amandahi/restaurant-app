import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export function LoginPage() {
  const { signInWithPassword, signUp, resetPasswordForEmail } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (mode === 'reset') {
      setSubmitting(true)
      const { error } = await resetPasswordForEmail(email.trim())
      setSubmitting(false)
      if (error) {
        setError(error)
        return
      }
      setResetSent(true)
      return
    }

    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setSubmitting(true)
    const { error } =
      mode === 'signup'
        ? await signUp(email.trim(), password)
        : await signInWithPassword(email.trim(), password)
    setSubmitting(false)
    if (error) {
      setError(error)
      return
    }
    navigate('/')
  }

  function toggleMode() {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))
    setError(null)
  }

  function startReset() {
    setMode('reset')
    setError(null)
    setResetSent(false)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-stone-900">Restaurant Journal</h1>
        <p className="mt-1 text-sm text-stone-400">
          {mode === 'reset' ? "We'll email you a link to set a new password" : 'Sign in to log and browse your visits'}
        </p>

        {mode === 'reset' && resetSent ? (
          <p className="mt-6 rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-600">
            Check <span className="font-medium text-stone-900">{email}</span> for a link to reset your password.
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
            {mode !== 'reset' && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !email.trim() || (mode !== 'reset' && !password.trim())}
              className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {mode === 'reset'
                ? submitting
                  ? 'Sending...'
                  : 'Send reset link'
                : submitting
                  ? mode === 'signup'
                    ? 'Creating account...'
                    : 'Signing in...'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Sign in'}
            </button>
          </form>
        )}

        {mode === 'reset' ? (
          <button
            type="button"
            onClick={toggleMode}
            className="mt-4 w-full text-center text-sm text-stone-400 hover:text-stone-600"
          >
            Back to sign in
          </button>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-2">
            <button type="button" onClick={toggleMode} className="text-center text-sm text-stone-400 hover:text-stone-600">
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
            {mode === 'signin' && (
              <button type="button" onClick={startReset} className="text-center text-sm text-stone-400 hover:text-stone-600">
                Forgot password?
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
