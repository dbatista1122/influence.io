import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
<<<<<<< Updated upstream
  return <div>General info/account connection here...</div>;
=======
  const session = useSession();
  return <div>
    General info/account connection here... {session.status.data}
    {/* <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button> */}
    </div>;
>>>>>>> Stashed changes
};

Analytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Analytics;
