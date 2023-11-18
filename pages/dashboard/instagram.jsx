import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const InstagramAnalytics = () => {
  return <div>Instagram here...</div>;
};

InstagramAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default InstagramAnalytics;
