import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main className="starter">
          <p className="eyebrow">Pokemon Explorer</p>
          <h1>A fresh TypeScript start</h1>
          <p>React, routing and test tooling are ready.</p>
          <p>Pokemon features will be built one task at a time.</p>
        </main>
      } />
    </Routes>
  )
}
