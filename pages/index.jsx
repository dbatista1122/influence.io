import RootLayout from "@/components/Layout";

const Home = () => {
  return (
    <main>
      <h1 className="text-5xl font-bold text-gray-900 leading-[1.4] mb-5">Influence.io</h1>
      <p className="text-2xl text-gray-700">Landing Page</p>
    </main>
  );
};

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
