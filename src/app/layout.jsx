import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export const metadata = {
  title: 'StyleHub - an online blog for clothes',
  description: 'A blog made for sharing and creating clothing designs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header />
          {children}
          {/* <Footer /> */}
      </body>
    </html>
  );
}