import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="app-shell">
      <EmptyState
        icon="?"
        iconVariant="not-found"
        title="Page not found"
        description="There is no page at this address."
        headingLevel="h1"
      >
        <Link className="text-link" to="/pokemon">Return to the catalog</Link>
      </EmptyState>
    </div>
  )
}
