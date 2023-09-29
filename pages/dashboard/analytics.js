import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  return <div>Analytics here...</div>;
};

Analytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Analytics;
