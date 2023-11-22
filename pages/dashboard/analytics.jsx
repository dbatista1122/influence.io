import RootLayout from "@/components/RootLayout";
import DashboardLayout from "@/components/DashboardLayout";
import { signOut, useSession } from "next-auth/react";

const DashboardAnalytics = () => {
  const session = useSession();
  return (
    <div>
      General info/account connection here... {session.status.data}
      {/* <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button> */}
    </div>
  );
};

DashboardAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default DashboardAnalytics;
