import ProfileFooter from "./ProfileFooter";
import Head from "next/head";

const OnlyFooterLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Influence.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen mx-auto max-w-4xl">
        <div className="flex-grow">
          <main>{children}</main>
        </div>
        <ProfileFooter />
      </div>
    </>
  );
};

export default OnlyFooterLayout;
