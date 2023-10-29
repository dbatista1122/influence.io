import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { signOut, useSession } from 'next-auth/react';


const Analytics = () => {

  const session = useSession();
  return <div>
    General info/account connection here... {session.status.data}
    {/* <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button> */}
    </div>;

  const session = useSession();
  return <div>
    General info/account connection here...{session.status}
    <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>
    </div>;
};

Analytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Analytics;
