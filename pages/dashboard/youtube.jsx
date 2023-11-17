import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import TopCardsLayout from "@/components/TopCardsLayout";
import TopCard from "@/components/TopCard";
import BarChart from "@/components/BarChart";
import RecentChangesTable from "@/components/RecentChangesTable";

const dummyData = [
  {
    id: 1,
    title: "Test",
    totalViews: 1234,
    totalLikes: 50,
    totalDislikes: 10,
    totalComments: 35,
  },
  {
    id: 2,
    title: "Test 2",
    totalViews: 12345,
    totalLikes: 501,
    totalDislikes: 105,
    totalComments: 352,
  },
  {
    id: 3,
    title: "Test 3",
    totalViews: 1234,
    totalLikes: 50,
    totalDislikes: 10,
    totalComments: 35,
  },
  {
    id: 4,
    title: "Test 4",
    totalViews: 6545,
    totalLikes: 45,
    totalDislikes: 54,
    totalComments: 645,
  },
  {
    id: 5,
    title: "Test 5",
    totalViews: 6548,
    totalLikes: 354,
    totalDislikes: 35,
    totalComments: 687,
  },
  {
    id: 6,
    title: "Test 6 ",
    totalViews: 3657,
    totalLikes: 3548,
    totalDislikes: 68,
    totalComments: 6578,
  },
  {
    id: 7,
    title: "Test 7",
    totalViews: 6874,
    totalLikes: 168,
    totalDislikes: 68,
    totalComments: 148,
  },
  {
    id: 8,
    title: "Test 8",
    totalViews: 6549,
    totalLikes: 3548,
    totalDislikes: 6878,
    totalComments: 654,
  },
  {
    id: 9,
    title: "Test 9",
    totalViews: 10668,
    totalLikes: 689,
    totalDislikes: 1987,
    totalComments: 5796,
  },
  {
    id: 10,
    title: "Test 10",
    totalViews: 7866,
    totalLikes: 7863,
    totalDislikes: 786,
    totalComments: 7867,
  },
];

const YoutubeAnalytics = () => {
  // TODO: Currently, this doesn't work on rebuild for some reason. Have it hardcoded to 5 right now in the component.
  const layoutColSize = 5;

  return (
    <div>
      <TopCardsLayout layoutColSize={layoutColSize}>
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

      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
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
