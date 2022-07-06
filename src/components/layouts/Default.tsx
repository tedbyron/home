import { ColorSchemeIcon } from '$components'
import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Divider,
  Global,
  Group,
  Text,
  ThemeIcon,
  Transition,
  UnstyledButton,
  type MantineColor,
  type MantineTheme
} from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'
import Link from 'next/link'
import { ReactElement, useState, type PropsWithChildren } from 'react'
import { Book, BrandGithub, Settings } from 'tabler-icons-react'

interface NavItem {
  name: string
  href: string
  icon: ReactElement
  color: MantineColor
}

const navItems: NavItem[] = [
  { name: 'Settings', href: '/settings', icon: <Settings size={16} />, color: 'teal' },
  { name: 'Documentation', href: '/docs', icon: <Book size={16} />, color: 'indigo' }
]

const NavLink = ({ name, href, icon, color }: NavItem): JSX.Element => (
  <Link href={href} passHref>
    <UnstyledButton
      component="a"
      aria-label={name}
      sx={(theme: MantineTheme) => ({
        display: 'block',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        }
      })}
    >
      <Group spacing="sm">
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text>{name}</Text>
      </Group>
    </UnstyledButton>
  </Link>
)

type Props = PropsWithChildren<{
  onMenuClose?: () => void
}>

const Layout = ({ onMenuClose, children }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false)
  const focusTrap = useFocusTrap()

  const openMenu = (): void => {
    setMenuOpen(true)
  }

  const closeMenu = (): void => {
    setMenuOpen(false)
    if (onMenuClose !== undefined) {
      onMenuClose()
    }
  }

  return (
    <>
      <Global
        styles={{
          ':root, #__next, body, main': {
            height: '100%'
          }
        }}
      />

      <AppShell
        padding="lg"
        aside={
          <Transition mounted={menuOpen} transition="fade" timingFunction="ease" duration={300}>
            {(styles: MantineTheme) => (
              <Aside
                ref={focusTrap}
                fixed
                style={styles}
                sx={(theme: MantineTheme) => ({
                  borderLeft: `1px solid ${
                    theme.colorScheme === 'light' ? theme.colors.gray[4] : theme.colors.dark[3]
                  }`,
                  [theme.fn.largerThan('xs')]: {
                    width: 250
                  }
                })}
              >
                <Aside.Section p="lg">
                  <Group position="apart" sx={{ flexDirection: 'row-reverse' }}>
                    <Burger
                      opened={menuOpen}
                      onClick={closeMenu}
                      size="sm"
                      ml="auto"
                      aria-label="Close menu"
                    />

                    <Group spacing="xs">
                      <ColorSchemeIcon />
                    </Group>
                  </Group>
                </Aside.Section>

                <Divider />

                <Aside.Section grow component="nav" p="xs">
                  {navItems.map((item) => (
                    <NavLink {...item} key={item.name} />
                  ))}
                </Aside.Section>

                <Divider />

                <Aside.Section p="xs" pr="lg">
                  <Group position="apart">
                    <Link href="/" passHref>
                      <UnstyledButton
                        component="a"
                        aria-label="home"
                        sx={(theme: MantineTheme) => ({
                          display: 'block',
                          padding: theme.spacing.xs,
                          borderRadius: theme.radius.md,
                          '&:hover': {
                            backgroundColor:
                              theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0]
                          }
                        })}
                      >
                        <Group spacing="xs">
                          <Text weight="bold">🧡</Text>
                          <Text weight="bold">SouSuo</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>

                    <Group spacing="xs">
                      <Link href="https://github.com/tedbyron/home" passHref>
                        <ActionIcon
                          component="a"
                          variant="default"
                          radius="md"
                          aria-label="SouSuo GitHub"
                        >
                          <BrandGithub size={16} />
                        </ActionIcon>
                      </Link>
                    </Group>
                  </Group>
                </Aside.Section>
              </Aside>
            )}
          </Transition>
        }
        styles={{
          root: { display: 'flex', flexDirection: 'column', height: '100%' },
          body: { flex: 1, minHeight: '100%' }
        }}
      >
        <Group>
          <Burger opened={menuOpen} onClick={openMenu} size="sm" ml="auto" aria-label="Open menu" />
        </Group>

        {children}
      </AppShell>
    </>
  )
}

export default Layout
