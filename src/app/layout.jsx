import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { UserProvider } from "./contexts/UserContext";

export const metadata = {
  title: 'StyleHub',
  description: 'A blog made for sharing and creating clothing designs',
  icons: {
    icon: '/favicon.png', // This refers to the file in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}