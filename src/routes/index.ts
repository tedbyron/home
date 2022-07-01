import type { RequestHandler } from './__types/index'

export const get: RequestHandler = ({ url }) => {
  let q = url.searchParams.get('q')

  // no query param, load index page
  if (q === null) {
    return {}
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
