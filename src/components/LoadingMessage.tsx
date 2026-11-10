type LoadingMessageProps = {
  message: string
}

export default function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <section className="request-state" role="status">
      <span className="request-state__spinner" aria-hidden="true" />
      <p>{message}</p>
    </section>
  )
}
