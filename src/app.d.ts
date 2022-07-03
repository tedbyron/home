/// <reference types="@cloudflare/workers-types" />
/// <reference types="@sveltejs/kit" />

declare namespace App {
  // https://developers.cloudflare.com/workers/runtime-apis/fetch-event#parameters
  interface Platform {
    env: {
      SEARCH_ENGINES: KVNamespace
      DEFAULT_SHORTCUTS: KVNamespace
    }
    context: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      waitUntil: (promise: Promise<any>) => void
      passThroughOnException: () => void
    }
  }
}
