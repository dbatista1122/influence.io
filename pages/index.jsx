import RootLayout from "@/components/Layout";

const Home = () => {
  return (
    <main className="text-center py-10 px-25">
      <section className="hero py-5">
        <div className="hero-content">
          <h1 className="text-4xl font-bold mb-4">Welcome to Influence.io</h1>
          <p className="text-lg">
            the leading platform to make sense of your social media analytics.            
          </p>
        </div>
      </section>
      
      <section className="m-14 ">
        <div className="flex p-5 py-10 justify-center space-x-10">
          <img
            src="https://via.placeholder.com/200x150"
            alt="Feature 1"
          />
          <div>
            <h2 className="text-xl font-semibold mt-2">Feature 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <div className="flex p-5 py-10 justify-center space-x-10">
          <div>
            <h2 className="text-xl font-semibold mt-2">Feature 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/200x150"
            alt="Feature 1"
          />
        
        </div>

        <div className="flex p-5 py-10 justify-center space-x-10">
          <img
            src="https://via.placeholder.com/200x150"
            alt="Feature 1"
          />
          <div>
            <h2 className="text-xl font-semibold mt-2">Feature 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
  </main>
  );
};

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
