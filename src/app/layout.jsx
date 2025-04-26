import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { UserProvider } from "./contexts/UserContext";
import Head from 'next/head';
export const metadata = {
  title: 'StyleHub',
  description: 'A blog made for sharing and creating clothing designs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon" />
        <meta name="description" content="A blog made for sharing and creating clothing designs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <UserProvider >
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}