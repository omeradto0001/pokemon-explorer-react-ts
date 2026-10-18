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
})
