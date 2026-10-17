import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from './App'

test('the initial route renders the English project starting point', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/']}><App /></MemoryRouter>,
  )
  expect(html).toContain('Pokemon Explorer')
  expect(html).toContain('A fresh TypeScript start')
})
