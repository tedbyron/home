import type { KV } from './env'

export const onRequestGet: PagesFunction<KV.Env> = async ({ request, env }) => {
  let q = new URL(request.url).searchParams.get('q')
  if (q === null) {
    return new Response('Bad Request: missing search parameter "q"', { status: 400 })
  }
  q = q.trim()

  // empty query, use search engine url
  if (q.length === 0) {
    const engine = await env.SEARCH_ENGINES.get<KV.SearchEngine>('DuckDuckGo', 'json')
    if (engine === null) {
      throw new Error('search engine not found')
    }

    return new Response(null, { status: 303, headers: { Location: engine.url } })
  }

  const [maybeShortcut, ...maybeArgs] = q.split(/\s+/)
  const shortcut = await env.DEFAULT_SHORTCUTS.get<KV.Shortcut>(maybeShortcut!, 'json')

  // no shortcut, use search engine search url
  if (shortcut === null) {
    const engine = await env.SEARCH_ENGINES.get<KV.SearchEngine>('DuckDuckGo', 'json')
    if (engine === null) {
      throw new Error('search engine not found')
    }

    return new Response(null, {
      status: 303,
      headers: {
        Location: engine.search.replace('{}', encodeURIComponent(q))
      }
    })
  } else {
    // shortcut with no arguments, use shortcut url
    if (maybeArgs.length === 0) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: shortcut.url
        }
      })
    }

    // shortcut with no extension table, use shortcut search url
    if (shortcut.ext === undefined) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: shortcut.search.replace('{}', encodeURIComponent(maybeArgs.join(' ')))
        }
      })
    } else {
      const rest = maybeArgs.join(' ')

      // check shortcut extension table for matching pattern
      for (let [pattern, replacement] of Object.entries(shortcut.ext)) {
        const re = new RegExp(`^${pattern}\$`)
        if (re.test(rest)) {
          return new Response(null, {
            status: 303,
            headers: {
              Location: rest.match(re)!.reduce((replacement, match, i) => {
                return replacement.replaceAll(`{${i}}`, encodeURIComponent(match))
              }, replacement)
            }
          })
        }
      }

      // no matching pattern in extension table, use shortcut search url
      return new Response(null, {
        status: 303,
        headers: {
          Location: shortcut.search.replace('{}', encodeURIComponent(rest))
        }
      })
    }
  }
}
