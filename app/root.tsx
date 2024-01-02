import stylesheet from '@/css/tailwind.css'
import type { LinksFunction } from '@remix-run/node'
import Content from '@/components/Placeholders/Content'
import Contents from '@/components/Placeholders/Contents'
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from '@remix-run/react'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

const App = () => {
  const navigation = useNavigation()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full flex flex-col items-center justify-start">
        <div autoFocus={true} className="w-full flex flex-col max-w-2xl px-8 py-16">
          <div className="flex flex-row items-center justify-between">
            <Link className="border hover:border-black rounded px-2 py-0.5 text-gray-800 hover:text-black" to="/">
              Home
            </Link>
            <Link className="border hover:border-black rounded px-2 py-0.5 text-gray-800 hover:text-black" to="/content">
              View All
            </Link>
          </div>
          {navigation.location?.pathname === '/content' ? <Contents /> : navigation.location?.pathname.includes('/content/') ? <Content /> : <Outlet />}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
