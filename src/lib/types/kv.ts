/** Search engine metadata. */
export interface SearchEngineMetadata {
  /** Search engine site URL. */
  url: string
}

/** Search shortcut. */
export interface Shortcut {
  /** Search URL in the same format as {@link SearchEngine} URLs. */
  search: string
  /**
   * Shortcut extension table.
   *
   * Keys are patterns for the {@link RegExp} constructor, values are
   * used as the second argument to {@link String.prototype.replace()}. Unnecessary overhead caused
   * by creating too many regular expressions is avoided by setting a high
   * {@link KVNamespaceGetOptions.cacheTtl}.
   */
  ext?: Record<string, string>
}

/** Search shortcut metadata. */
export interface ShortcutMetadata {
  /** Name of the site that the shortcut points to. */
  name: string
  /** Shortcut site URL. */
  url: string
}

/** User data. */
export interface User {
  isAdmin: boolean
  /**
   * User shortcuts (override default shortcuts).
   * @see {@link Shortcut}, {@link ShortcutMetadata}
   */
  shortcuts: Record<string, Shortcut>
}
