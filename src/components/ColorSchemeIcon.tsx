import { useColorScheme, useUserColorScheme } from '$lib/color-scheme'
import { ActionIcon, type ThemeIconVariant } from '@mantine/core'
import { Moon, Sun } from 'tabler-icons-react'

interface Props {
  size?: string | number
  variant?: ThemeIconVariant
}

// TODO: mantine popper with options like tailwind website theme changer
const ColorSchemeIcon = ({ size = 16 }: Props): JSX.Element => {
  const colorScheme = useColorScheme()
  const { toggleUserColorScheme } = useUserColorScheme()

  return (
    <ActionIcon
      variant="default"
      onClick={() => toggleUserColorScheme()}
      aria-label="Change color scheme"
      radius="md"
    >
      {colorScheme === 'light' ? <Moon size={size} /> : <Sun size={size} />}
    </ActionIcon>
  )
}

export default ColorSchemeIcon
