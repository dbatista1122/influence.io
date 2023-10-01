import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const RootLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-8xl">
      <div className="flex-grow">
        <Head>
          <title>Influence.io</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <main className="my-0 py-16">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
