type EmptyMessageProps = {
  title?: string
  description?: string
}

export default function EmptyMessage({ title, description }: EmptyMessageProps) {
  return (
    <section className="request-state" role="status">
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </section>
  )
}
