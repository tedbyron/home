import { useColorScheme } from '$lib/color-scheme'
import { ActionIcon, type ActionIconVariant } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Moon, Sun } from 'tabler-icons-react'

interface Props {
  size?: string | number
  variant?: ActionIconVariant
}

// TODO: mantine popper with options like tailwind website theme changer
const ColorSchemeIcon = ({ size = 16, variant = 'default' }: Props): JSX.Element => {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')
  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    <ActionIcon
      variant={variant}
      radius="md"
      onClick={() => toggleColorScheme()}
      aria-label="Change the site color scheme"
    >
      {(colorScheme === 'system' && prefersLight) || colorScheme === 'light' ? (
        <Moon size={size} />
      ) : (
        <Sun size={size} />
      )}
    </ActionIcon>
  )
}

export default ColorSchemeIcon
