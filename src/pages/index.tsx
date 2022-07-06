import Layout from '$layouts/Default'
import { Box, CloseButton, TextInput, type MantineTheme } from '@mantine/core'
import type { NextPage } from 'next'
import { useState, type FormEvent } from 'react'
import { Search } from 'tabler-icons-react'

const Index: NextPage = () => {
  const [query, setQuery] = useState('')

  const clearInput = (): void => {
    setQuery('')
  }

  const search = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(query)
  }

  return (
    <Layout>
      <Box
        sx={(theme: MantineTheme) => ({
          maxWidth: theme.breakpoints.xs,
          marginTop: 128,
          marginRight: 'auto',
          marginLeft: 'auto'
        })}
      >
        <form
          // action="/api/search"
          // method="get"
          onSubmit={search}
        >
          <TextInput
            type="search"
            variant="filled"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            icon={<Search size={20} aria-hidden />}
            rightSection={query.length > 0 && <CloseButton onClick={clearInput} size="lg" />}
            rightSectionWidth={50}
            aria-label="Search query"
            radius="md"
            size="lg"
          />
        </form>
      </Box>
    </Layout>
  )
}

export default Index
