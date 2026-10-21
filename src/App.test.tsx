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

test('the detail route uses its URL identifier to select a Pokemon', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon/25']}><App /></MemoryRouter>,
  )

  expect(html).toContain('Pokemon #025')
  expect(html).toContain('<h1>Pikachu</h1>')
  expect(html).toContain('pokemon-list-item--active')
})
