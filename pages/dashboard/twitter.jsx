import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  return <div>Twitter here...</div>;
};

Analytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Analytics;
