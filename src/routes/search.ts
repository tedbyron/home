import type { RequestHandler } from './__types/search'

export const get: RequestHandler = async ({ url, platform }) => {
  let q = url.searchParams.get('q')
  if (q === null) {
    return {
      status: 400,
      body: 'Bad Request: missing search parameter "q"'
    }
  }
  q = q.trim()

  if (q.length === 0) {
    try {
      const url = await platform.env.SEARCH_ENGINES.get('DuckDuckGo')
      if (url === null) {
        return {
          status: 500,
          body: 'Internal Server Error: missing search engine URL'
        }
      }

      return {
        status: 303,
        headers: { location: url }
      }
    } catch (err) {
      return {
        status: 500,
        body:
          'Internal Server Error: failed worker KV request' +
          JSON.stringify(err, Object.getOwnPropertyNames(err))
      }
    }
  }

  return {
    status: 303,
    headers: {
      Location: 'https://duckduckgo.com/?q=' + encodeURIComponent(q)
    }
  }
}
