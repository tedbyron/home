import type { ColorScheme as MantineColorScheme } from '@mantine/core'
import { type PropsWithChildren, createContext, useContext } from 'react'

/** {@link MantineColorScheme} extended with a `system` setting to be set by media query. */
export type UserColorScheme = MantineColorScheme | 'system'
interface UserColorSchemeContextProps {
  userColorScheme: UserColorScheme
  toggleUserColorScheme: (colorScheme?: UserColorScheme) => void
}
type UserColorSchemeProviderProps = PropsWithChildren<UserColorSchemeContextProps>
type ColorSchemeProviderProps = PropsWithChildren<{
  colorScheme: MantineColorScheme
}>

const UserColorSchemeContext = createContext<UserColorSchemeContextProps>(null!)

export const UserColorSchemeProvider = ({
  userColorScheme,
  toggleUserColorScheme,
  children
}: UserColorSchemeProviderProps) => (
  <UserColorSchemeContext.Provider value={{ userColorScheme, toggleUserColorScheme }}>
    {children}
  </UserColorSchemeContext.Provider>
)

/** Hook to get the current {@link UserColorScheme}. */
export const useUserColorScheme = (): UserColorSchemeContextProps => {
  return useContext(UserColorSchemeContext)
}

const ColorSchemeContext = createContext<MantineColorScheme>(null!)

export const ColorSchemeProvider = ({ colorScheme, children }: ColorSchemeProviderProps) => (
  <ColorSchemeContext.Provider value={colorScheme}>{children}</ColorSchemeContext.Provider>
)

/** Hook to get the current {@link MantineColorScheme}. */
export const useColorScheme = (): MantineColorScheme => {
  return useContext(ColorSchemeContext)
}
