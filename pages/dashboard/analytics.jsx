import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { useSession } from 'next-auth/react';


const Analytics = () => {
  const session = useSession();
  return <div>General info/account connection here...{session.status}</div>;
};

Analytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Analytics;
