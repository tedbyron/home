import Layout from '$layouts/Default'
import { Box, CloseButton, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { NextPage } from 'next'
import { Search } from 'tabler-icons-react'

interface FormValues {
  searchQuery: string
}

const search = ({ searchQuery }: FormValues) => {
  console.log(searchQuery)
}

const Index: NextPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      searchQuery: ''
    }
  })

  const clearInput = () => {
    form.setFieldValue('searchQuery', '')
  }

  return (
    <Layout>
      <Box
        sx={(theme) => ({
          maxWidth: theme.breakpoints.xs,
          marginTop: 128,
          marginRight: 'auto',
          marginLeft: 'auto'
        })}
      >
        <form onSubmit={form.onSubmit(search)}>
          <TextInput
            variant="filled"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            icon={<Search size={20} aria-hidden />}
            rightSection={
              form.values.searchQuery.length > 0 && <CloseButton onClick={clearInput} size="lg" />
            }
            rightSectionWidth={50}
            aria-label="Search query"
            {...form.getInputProps('searchQuery')}
            radius="md"
            size="lg"
          />
        </form>
      </Box>
    </Layout>
  )
}

export default Index
