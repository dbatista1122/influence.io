import RootLayout from "@/components/RootLayout";
import DashboardLayout from "@/components/DashboardLayout";

const TwitterAnalytics = () => {
  return <div>Twitter here...</div>;
};

TwitterAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default TwitterAnalytics;
