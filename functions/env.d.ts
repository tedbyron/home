export namespace KV {
  interface Env {
    /** Keys are search engine names, values are {@link KV.SearchEngine}s. */
    SEARCH_ENGINES: KVNamespace
    /** Keys are shortcut names, values are {@link KV.Shortcut}s. */
    DEFAULT_SHORTCUTS: KVNamespace
  }

  /** Search engine. */
  interface SearchEngine {
    /** Search engine site URL used when there is no search query. */
    url: string
    /**
     * Search engine search URL.
     *
     * Uses `{}` as a placeholder to insert a search query into the URL.
     */
    search: string
  }

  /** Search shortcut. */
  interface Shortcut {
    /** Shortcut site URL used when only a shortcut is entered. */
    url: string
    /** Shortcut search URL in the same format as {@link SearchEngine.search}. */
    search: string
    /**
     * Shortcut extension table.
     *
     * Keys are patterns for the {@link RegExp} constructor, values are replacement strings (second
     * argument to {@link String.prototype.replace}).
     */
    ext?: Record<string, string>
  }

  /** Search shortcut metadata. */
  interface ShortcutMetadata {
    /** Name of the site that the shortcut points to. */
    name: string
  }

  /** User data. */
  interface User {
    /** User search engine name. */
    searchEngine: string
    /**
     * User shortcuts (override default shortcuts).
     * @see {@link Shortcut}, {@link ShortcutMetadata}
     */
    shortcuts: Record<string, Shortcut>
  }

  /** User metadata. */
  interface UserMetadata {
    isAdmin: boolean
  }
}
