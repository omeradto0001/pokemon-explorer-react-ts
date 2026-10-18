import { NavLink, Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function AppLayout() {
  return (
    <div className="app-frame">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/pokemon">
            <span className="brand__mark" aria-hidden="true" />
            <span>Pokemon Explorer</span>
          </NavLink>
          <Navigation />
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
