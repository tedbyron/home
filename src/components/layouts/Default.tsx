import ColorSchemeIcon from '$components/ColorSchemeIcon'
import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Divider,
  Global,
  Group,
  type MantineColor,
  type MantineTheme,
  Text,
  ThemeIcon,
  Transition,
  UnstyledButton
} from '@mantine/core'
import Link from 'next/link'
import { ReactElement, useState, type PropsWithChildren } from 'react'
import { Book, BrandGithub, Settings } from 'tabler-icons-react'

type Props = PropsWithChildren<{
  header?: ReactElement
  footer?: ReactElement
}>

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
      sx={(theme) => ({
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

const Layout = ({ children }: Props): JSX.Element => {
  const [opened, setOpened] = useState(false)

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
          <Transition mounted={opened} transition="fade">
            {(styles) => (
              <Aside fixed width={{ xs: 250 }} style={styles}>
                <Aside.Section p="lg">
                  <Group position="apart">
                    <Group spacing="xs">
                      <ColorSchemeIcon />
                    </Group>

                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      ml="auto"
                    />
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
                        sx={(theme) => ({
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
        styles={(theme: MantineTheme) => ({
          root: { display: 'flex', flexDirection: 'column', height: '100%' },
          body: { flex: 1, minHeight: '100%' },
          main: {
            backgroundColor:
              theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[8]
          }
        })}
      >
        <Group>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" ml="auto" />
        </Group>

        {children}
      </AppShell>
    </>
  )
}

export default Layout
