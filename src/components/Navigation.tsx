import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Pokemon', to: '/pokemon' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'Compare', to: '/compare' },
]

export default function Navigation() {
  return (
    <nav className="primary-navigation" aria-label="Primary navigation">
      {navigationItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `primary-navigation__link${isActive ? ' primary-navigation__link--active' : ''}`
          }
          key={item.to}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
