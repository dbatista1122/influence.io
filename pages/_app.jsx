import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from 'next-auth/react';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // If page layout is available, use it. Else return the page
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider>
      {getLayout(
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      )}
    </SessionProvider>
  );
}
