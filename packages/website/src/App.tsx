import { MantineProvider, type MantineThemeOverride, Text } from '@mantine/core'

const theme: MantineThemeOverride = {
  colorScheme: 'dark'
}

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Text>Hello</Text>
  </MantineProvider>
)

export default App
