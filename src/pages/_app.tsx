import {
  ColorSchemeProvider,
  type UserColorScheme,
  UserColorSchemeProvider
} from '$lib/color-scheme'
import { ColorScheme as MantineColorScheme, MantineProvider } from '@mantine/core'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')
  const [userScheme, setUserScheme] = useLocalStorage<UserColorScheme>({
    key: 'color-scheme',
    defaultValue: 'system',
    getInitialValueInEffect: true
  })
  const [colorScheme, setColorScheme] = useState<MantineColorScheme>(
    prefersLight ? 'light' : 'dark'
  )

  useEffect(() => {
    if (userScheme === 'system') {
      setColorScheme(prefersLight ? 'light' : 'dark')
    } else {
      setColorScheme(userScheme)
    }
  }, [prefersLight, userScheme])

  const toggleUserScheme = (value?: UserColorScheme) => {
    if (value !== undefined) {
      setUserScheme(value)
    } else if (userScheme === 'system') {
      setUserScheme(prefersLight ? 'dark' : 'light')
    } else {
      setUserScheme(userScheme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <>
      <Head>
        <title>SouSuo</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SouSuo" />
        <meta name="description" content="Customizable home page with search shortcuts" />
        <meta property="og:description" content="Customizable home page with search shortcuts" />
      </Head>

      <UserColorSchemeProvider
        userColorScheme={userScheme}
        toggleUserColorScheme={toggleUserScheme}
      >
        <ColorSchemeProvider colorScheme={colorScheme}>
          <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme }}>
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </UserColorSchemeProvider>
    </>
  )
}

export default App
