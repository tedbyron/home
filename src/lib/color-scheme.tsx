import { createContext, useContext } from 'react'

export type ColorScheme = 'light' | 'dark' | 'system'

interface ColorSchemeContextProps {
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
}

interface ColorSchemeProviderProps extends ColorSchemeContextProps {
  children: React.ReactNode
}

const ColorSchemeContext = createContext<ColorSchemeContextProps>(null!)

export const ColorSchemeProvider = ({
  colorScheme,
  toggleColorScheme,
  children
}: ColorSchemeProviderProps) => (
  <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
    {children}
  </ColorSchemeContext.Provider>
)

/** Hook to get the current color scheme. */
export const useColorScheme = (): ColorSchemeContextProps => {
  return useContext(ColorSchemeContext)
}
