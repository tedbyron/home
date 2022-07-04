import Layout from '$layouts/Default'
import { ActionIcon, Center, Group } from '@mantine/core'
import type { NextPage } from 'next'
import { Search } from 'tabler-icons-react'

const Index: NextPage = () => {
  return (
    <Layout>
      <Center>
        <Group>
          <ActionIcon>
            <Search size={24} />
          </ActionIcon>
        </Group>
      </Center>
    </Layout>
  )
}

export default Index
