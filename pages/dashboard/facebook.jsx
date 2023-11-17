import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const FacebookAnalytics = () => {
  return <div>Facebook here...</div>;
};

FacebookAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default FacebookAnalytics;
