import Layout from '$layouts/Default'
import { Box, CloseButton, TextInput, type MantineTheme } from '@mantine/core'
import type { HotkeyItem } from '@mantine/hooks'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { Search } from 'tabler-icons-react'

const Index: NextPage = () => {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null!)

  useEffect(() => input.current.focus(), [])

  const clearInput = (): void => setQuery('')
  const selectInput = (): void => {
    if (document.activeElement !== input.current) {
      input.current.select()
    }
  }

  const hotkeys: HotkeyItem[] = [
    ['/', selectInput],
    ['mod+k', selectInput]
  ]

  return (
    <Layout hotkeys={hotkeys} onMenuClose={selectInput}>
      <Box
        sx={(theme: MantineTheme) => ({
          maxWidth: theme.breakpoints.xs,
          marginTop: 128,
          marginRight: 'auto',
          marginLeft: 'auto'
        })}
      >
        <form action="/search" method="get">
          <TextInput
            type="search"
            variant="filled"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            name="q"
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            icon={<Search size={20} aria-hidden />}
            rightSection={query.length > 0 && <CloseButton onClick={clearInput} size="lg" />}
            rightSectionWidth={50}
            aria-label="Search"
            radius="md"
            size="lg"
          />
        </form>
      </Box>
    </Layout>
  )
}

export default Index
