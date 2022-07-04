import { createGetInitialProps } from '@mantine/next'
import Document from 'next/document'

const getInitialProps = createGetInitialProps()

const Root = class extends Document {
  static override getInitialProps = getInitialProps
}

export default Root
