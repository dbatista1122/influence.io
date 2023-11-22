import RootLayout from "@/components/RootLayout";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl font-bold mb-4 pt-10">Welcome to Influence.io</h1>
        <p className="text-2xl">Empower Your Social Media Strategy</p>

        <p className="text-2lg px-40 pt-10 ">
          At Influence.io, we've revolutionized social media management, making it simpler and more
          effective than ever before. Our platform offers a wide range of benefits to enhance your
          social media data analytics experience.
        </p>
      </div>

      <section className="m-14 px-10 bg-red">
        <div className="flex items-center p-5 py-15 space-x-10">
          <Image
            className="basis-1/2"
            src="/static/ComprehensiveAnalytics.webp"
            width={5}
            height={5}
            unoptimized
          />
          <div>
            <h2 className="basis-1/2 text-xl font-semibold mt-2 p-5">Comprehensive Analytics</h2>
            <p>
              Gain deep insights into your social media performance. Measure engagement, track
              growth, and uncover what content resonates with your audience.{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center p-5 py-15 justify-center space-x-10">
          <div>
            <h2 className="basis-1/2 text-xl font-semibold p-5 mt-2">Multi-Platform Integration</h2>
            <p>
              Manage multiple social media accounts in one place. Whether it's Facebook, Twitter,
              Instagram, or LinkedIn, we've got you covered.{" "}
            </p>
          </div>
          <Image
            className="basis-1/2"
            src="/static/SocialMediaApps.jpg"
            width={5}
            height={5}
            unoptimized
          />
        </div>

        <div className="flex items-center p-5 py-15 justify-center space-x-10">
          <Image
            className="basis-1/2"
            src="/static/DataSecurity.jpg"
            width={5}
            height={5}
            unoptimized
          />

          <div>
            <h2 className="basis-1/2 text-xl font-semibold mt-2 p-5 item-center">Data Security</h2>
            <p>
              Rest easy knowing your data is protected. We employ the highest security standards to
              keep your information safe and secure.{" "}
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
