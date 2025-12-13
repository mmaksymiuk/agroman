import { useEffect, useState } from 'react'

type Health = { status: string; service: string }

function getApiBase(): string {
  // Read from runtime env.js produced by nginx entrypoint
  // @ts-ignore
  const env = (window as any).__ENV || {}
  return env.API_BASE_URL || 'http://localhost:8080/api'
}

export default function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const api = getApiBase()
    fetch(`${api}/health`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setHealth(data))
      .catch((e) => setError(String(e)))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Agroman</h1>
      <p>Frontend is up. Trying to reach backend health...</p>
      {health && (
        <pre style={{ background: '#f5f5f5', padding: 12 }}>
{JSON.stringify(health, null, 2)}
        </pre>
      )}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
    </div>
  )
}
