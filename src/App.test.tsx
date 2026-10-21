import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import App from './App'

test('the initial route renders the local Pokemon catalog', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon']}><App /></MemoryRouter>,
  )
  expect(html).toContain('Pokemon Explorer')
  expect(html).toContain('Meet the first four')
  expect(html).toContain('Bulbasaur')
  expect(html).toContain('Pikachu')
  expect(html).toContain('href="/pokemon/1"')
  expect(html).toContain('href="/pokemon/25"')
})

test('the detail route uses its URL identifier to select a Pokemon', () => {
  const html = renderToStaticMarkup(
    <MemoryRouter initialEntries={['/pokemon/25']}><App /></MemoryRouter>,
  )

  expect(html).toContain('Pokemon #025')
  expect(html).toContain('<h1>Pikachu</h1>')
  expect(html).toContain('pokemon-list-item--active')
})
