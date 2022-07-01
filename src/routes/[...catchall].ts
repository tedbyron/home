import { redirectHome } from '$lib'
import type { RequestHandler } from './__types/[...catchall]'

export const get: RequestHandler = () => redirectHome()
