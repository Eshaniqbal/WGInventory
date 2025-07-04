// Simple authentication utility
const ADMIN_CREDENTIALS = {
  username: 'womensgallery',
  password: '12345'
};

export interface AuthSession {
  isAuthenticated: boolean;
  username?: string;
}

// Check if credentials are valid
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// Simple session storage (in production, use proper session management)
export function createSession(username: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_session', JSON.stringify({ isAuthenticated: true, username }));
  }
}

export function getSession(): AuthSession {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('auth_session');
    return session ? JSON.parse(session) : { isAuthenticated: false };
  }
  return { isAuthenticated: false };
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_session');
  }
}

export function isAuthenticated(): boolean {
  return getSession().isAuthenticated;
} 