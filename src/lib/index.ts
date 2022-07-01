import type { RequestHandlerOutput } from '@sveltejs/kit'

/** Return a `303 See Other` response status code with the `Location` header set to `'/'`. */
export const redirectHome = (): RequestHandlerOutput => {
  return {
    status: 303,
    headers: {
      Location: '/'
    }
  }
}
