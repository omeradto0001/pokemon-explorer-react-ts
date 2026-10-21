import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from './App'

test('the catalog shows loading feedback before its request completes', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon']}><App /></MemoryRouter>,
  )
  expect(html).toContain('Pokemon Explorer')
  expect(html).toContain('Explore Pokemon')
  expect(html).toContain('Loading Pokemon...')
})

test('the detail route shows loading feedback for a valid identifier', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon/25']}><App /></MemoryRouter>,
  )

  expect(html).toContain('Loading Pokemon details...')
})

test('the detail route rejects an invalid identifier', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon/not-an-id']}><App /></MemoryRouter>,
  )

  expect(html).toContain('Pokemon not found')
})
