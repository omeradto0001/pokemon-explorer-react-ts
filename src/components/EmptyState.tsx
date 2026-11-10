import { useId, type ReactNode } from 'react'

type EmptyStateProps = {
  icon: string
  iconVariant?: 'not-found' | 'compare'
  title: string
  description: string
  headingLevel?: 'h1' | 'h2'
  children?: ReactNode
}

export default function EmptyState({
  icon,
  iconVariant,
  title,
  description,
  headingLevel: Heading = 'h2',
  children,
}: EmptyStateProps) {
  const titleId = useId()
  const iconClassName = iconVariant
    ? `empty-state__icon empty-state__icon--${iconVariant}`
    : 'empty-state__icon'

  return (
    <section className="empty-state" aria-labelledby={titleId}>
      <span className={iconClassName} aria-hidden="true">{icon}</span>
      <div>
        <Heading id={titleId}>{title}</Heading>
        <p>{description}</p>
        {children}
      </div>
    </section>
  )
}
