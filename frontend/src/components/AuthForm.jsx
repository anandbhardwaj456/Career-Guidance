import { useState, useMemo, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEmailCheck } from '../hooks/useEmailCheck';
import { validateEmail } from '../utils/emailValidator';

export default function AuthForm() {
  const [authMode, setAuthMode] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { login, register, loading } = useAuth();
  
  // Email validation and availability check (only for register mode)
  const emailCheck = useEmailCheck(authEmail, authMode === 'register' && emailTouched);

  // Password strength indicator
  const passwordStrength = useMemo(() => {
    if (!authPassword) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (authPassword.length >= 6) strength++;
    if (authPassword.length >= 8) strength++;
    if (/[A-Z]/.test(authPassword)) strength++;
    if (/[a-z]/.test(authPassword)) strength++;
    if (/[0-9]/.test(authPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(authPassword)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-500'];
    
    return {
      strength: Math.min(strength, 5),
      label: labels[Math.min(strength, 5)],
      color: colors[Math.min(strength, 5)],
    };
  }, [authPassword]);

  // Auto-focus email input when switching to register mode
  useEffect(() => {
    if (authMode === 'register' && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [authMode]);

  const validateForm = () => {
    if (authMode === 'register') {
      if (!authName.trim()) {
        setAuthError('Please enter your name');
        return false;
      }
      if (authName.trim().length < 2) {
        setAuthError('Name must be at least 2 characters');
        return false;
      }
    }

    if (!authEmail.trim()) {
      setAuthError('Please enter your email');
      return false;
    }

    const emailValidation = validateEmail(authEmail);
    if (!emailValidation.valid) {
      setAuthError(emailValidation.error || 'Please enter a valid email address');
      return false;
    }

    // Check email availability for registration
    if (authMode === 'register' && emailCheck.isAvailable === false) {
      setAuthError(emailCheck.error || 'This email is already registered');
      return false;
    }

    if (!authPassword) {
      setAuthError('Please enter your password');
      return false;
    }

    if (authPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // Prevent submission if already loading or submitting
    if (loading || isSubmitting) {
      return;
    }

    // Prevent submission if email is being checked (for register mode)
    if (authMode === 'register' && emailCheck.isChecking) {
      setAuthError('Please wait while we check email availability...');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (authMode === 'register') {
        await register(authName.trim(), authEmail.trim(), authPassword);
        setAuthSuccess('Account created successfully! Redirecting...');
        // Small delay to show success message
        setTimeout(() => {
          // User will be redirected automatically by useAuth hook
        }, 500);
      } else {
        await login(authEmail.trim(), authPassword);
        setAuthSuccess('Login successful! Redirecting...');
        // Small delay to show success message
        setTimeout(() => {
          // User will be redirected automatically by useAuth hook
        }, 500);
      }
    } catch (err) {
      setAuthError(err.message);
      // Focus back on the first invalid field
      if (authMode === 'register' && !authName.trim()) {
        nameInputRef.current?.focus();
      } else if (!authEmail.trim()) {
        emailInputRef.current?.focus();
      } else if (!authPassword) {
        passwordInputRef.current?.focus();
      } else {
        emailInputRef.current?.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (mode) => {
    // Prevent switching while loading
    if (loading) {
      return;
    }
    
    setAuthMode(mode);
    setAuthError('');
    setAuthPassword('');
    setEmailTouched(false);
    // Clear email suggestions when switching modes
    if (mode === 'login') {
      setAuthEmail('');
      setAuthName('');
    }
    // Focus email input when switching to register
    if (mode === 'register') {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/70">
        <h1 className="text-xl font-semibold mb-1 text-center">
          {authMode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-xs text-slate-400 text-center mb-4">
          Sign in to access your personalized career readiness dashboard.
        </p>

        <form onSubmit={handleAuthSubmit} className="space-y-3 text-sm">
          {authMode === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Full name</label>
              <input
                ref={nameInputRef}
                type="text"
                value={authName}
                onChange={(e) => {
                  setAuthName(e.target.value);
                  setAuthError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    emailInputRef.current?.focus();
                  }
                }}
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Anand Kumar"
                autoComplete="name"
                disabled={loading || isSubmitting}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</label>
            <div className="relative">
              <input
                ref={emailInputRef}
                type="email"
                value={authEmail}
                onChange={(e) => {
                  setAuthEmail(e.target.value);
                  setEmailTouched(true);
                  setAuthError(''); // Clear error when typing
                }}
                onBlur={() => setEmailTouched(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading && !isSubmitting) {
                    e.preventDefault();
                    if (authMode === 'register') {
                      nameInputRef.current?.focus();
                    } else {
                      passwordInputRef.current?.focus();
                    }
                  }
                }}
                disabled={loading || isSubmitting}
                className={`rounded-xl border px-3 py-2 text-sm text-slate-50 shadow-sm focus:outline-none focus:ring-1 w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  emailTouched && authMode === 'register'
                    ? emailCheck.isValid && emailCheck.isAvailable === true
                      ? 'border-emerald-500/50 bg-slate-900/80 focus:border-emerald-500 focus:ring-emerald-500'
                      : emailCheck.error || !emailCheck.isValid
                      ? 'border-rose-500/50 bg-slate-900/80 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 bg-slate-900/80 focus:border-sky-500 focus:ring-sky-500'
                    : 'border-slate-700 bg-slate-900/80 focus:border-sky-500 focus:ring-sky-500'
                }`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {emailTouched && authMode === 'register' && authEmail && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailCheck.isChecking ? (
                    <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : emailCheck.isValid && emailCheck.isAvailable === true ? (
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : emailCheck.isAvailable === false ? (
                    <svg className="h-4 w-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              )}
            </div>
            {emailTouched && authMode === 'register' && (
              <div className="mt-1">
                {emailCheck.error && (
                  <p className="text-[10px] text-rose-400">{emailCheck.error}</p>
                )}
                {emailCheck.isValid && emailCheck.isAvailable === true && (
                  <p className="text-[10px] text-emerald-400">✓ Email is available</p>
                )}
                {emailCheck.suggestions && emailCheck.suggestions.length > 0 && (
                  <div className="mt-1">
                    <p className="text-[10px] text-slate-400 mb-1">Suggestions:</p>
                    {emailCheck.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAuthEmail(suggestion);
                          setEmailTouched(true);
                        }}
                        className="text-[10px] text-sky-300 hover:text-sky-200 mr-2 underline"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                type={showPassword ? 'text' : 'password'}
                value={authPassword}
                onChange={(e) => {
                  setAuthPassword(e.target.value);
                  setAuthError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading && !isSubmitting) {
                    e.preventDefault();
                    handleAuthSubmit(e);
                  }
                }}
                disabled={loading || isSubmitting}
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 pr-10 text-sm text-slate-50 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading || isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {authMode === 'register' && authPassword && (
              <div className="mt-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">{passwordStrength.label}</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {authPassword.length < 6 && 'At least 6 characters required'}
                </p>
              </div>
            )}
          </div>

          {authSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{authSuccess}</span>
            </div>
          )}

          {authError && (
            <div className="flex items-start gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading || 
              isSubmitting ||
              (authMode === 'register' && emailCheck.isChecking) ||
              !authEmail.trim() || 
              !authPassword ||
              (authMode === 'register' && (!authName.trim() || authName.trim().length < 2)) ||
              (authMode === 'register' && emailCheck.isAvailable === false)
            }
            className="w-full h-10 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-400 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-sky-500 disabled:hover:shadow-sky-500/30 flex items-center justify-center gap-2 relative"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{authMode === 'login' ? 'Signing in…' : 'Creating account…'}</span>
              </>
            ) : authMode === 'register' && emailCheck.isChecking ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Checking email…</span>
              </>
            ) : (
              <>
                {authMode === 'login' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Create Account</span>
                  </>
                )}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-[11px] text-slate-400 text-center">
          {authMode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                disabled={loading}
                className="text-sky-300 hover:text-sky-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                disabled={loading}
                className="text-sky-300 hover:text-sky-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

