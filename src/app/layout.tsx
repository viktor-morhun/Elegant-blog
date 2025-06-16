import { Providers } from "./providers";
import ThemeToggle from "./components/ThemeToggle";
import Logo from "./components/Logo";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elegant Blog | Modern SSR Blog with Redux Toolkit",
  description:
    "A beautiful and responsive blog built with Next.js, Redux Toolkit, and Firestore",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="header">
            <div className="container">
              <div
                className="headerContent"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Logo />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="container">
              <p>
                © {new Date().getFullYear()} Elegant Blog. Why don't programmers
                like nature? Too many bugs. *cricket sounds*
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
