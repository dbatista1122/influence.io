import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import TopCardsLayout from "@/components/TopCardsLayout";
import TopCard from "@/components/TopCard";
import BarChart from "@/components/BarChart";
import RecentChangesTable from "@/components/RecentChangesTable";

const YoutubeAnalytics = () => {
  return (
    <div>
      <TopCardsLayout layoutColSize={5}>
        <TopCard
          colSpanSize={2}
          value={"+50"}
          trackedDataName={"Daily Subscribers"}
          positiveOrNegative={"positive"}
          percentageChange={"1"}
        />
        <TopCard
          colSpanSize={2}
          value={"+1000"}
          trackedDataName={"Monthly Subscribers"}
          positiveOrNegative={"positive"}
          percentageChange={"35"}
        />
        <TopCard
          colSpanSize={1}
          value={"-5000"}
          trackedDataName={"Yearly Subscribers"}
          positiveOrNegative={"negative"}
          percentageChange={"86"}
        />
      </TopCardsLayout>

      <div>
        <BarChart />
        <RecentChangesTable />
      </div>
    </div>
  );
};

YoutubeAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default YoutubeAnalytics;
