import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>NMP+ is running 🎉</h1>
      <p>Minimal scaffold — swap this out for the real homepage.</p>
    </div>
  )
}
