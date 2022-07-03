import type { RequestHandler } from './__types/search'

export const get: RequestHandler = ({ url }) => {
  let q = url.searchParams.get('q')
  if (q === null) {
    return {
      status: 400,
      body: 'Bad Request: missing search parameter "q"'
    }
  }
  q = q.trim()

  if (q.length === 0) {
    return {
      status: 303,
      headers: { location: 'https://duckduckgo.com' }
    }
  }

  return {
    status: 303,
    headers: {
      Location: 'https://duckduckgo.com/?q=' + encodeURIComponent(q)
    }
  }
}
