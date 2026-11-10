type ErrorMessageProps = {
  title: string
  description?: string
  headingLevel?: 'h1' | 'h2'
  onRetry: () => void
}

export default function ErrorMessage({
  title,
  description,
  headingLevel: Heading = 'h2',
  onRetry,
}: ErrorMessageProps) {
  return (
    <section className="request-state" role="alert">
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
      <button className="retry-button" onClick={onRetry} type="button">
        Try again
      </button>
    </section>
  )
}
