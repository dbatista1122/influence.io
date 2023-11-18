import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const TikTokAnalytics = () => {
  return <div>Tiktok here...</div>;
};

TikTokAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default TikTokAnalytics;
