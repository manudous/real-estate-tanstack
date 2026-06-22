import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import Header from "#/components/Header";
import Footer from "#/components/Footer";
import { getHeader, getFooter } from "#/lib/queries";

export const Route = createRootRoute({
  // SSR: header y footer se cargan en el servidor (desde el snapshot) en cada request.
  loader: async () => ({
    header: await getHeader(),
    footer: await getFooter(),
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Real Estate · TanStack Start (SSR + snapshot)" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
});

function RootLayout() {
  const { header, footer } = Route.useLoaderData();
  return (
    <>
      <Header header={header} />
      <main>
        <Outlet />
      </main>
      <Footer footer={footer} />
    </>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
