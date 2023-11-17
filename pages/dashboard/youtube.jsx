import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import TopCardsLayout from "@/components/TopCardsLayout";
import TopCard from "@/components/TopCard";
import BarChart from "@/components/Youtube/BarChart";
import RecentVideos from "@/components/Youtube/RecentVideos";
import LineChart from "@/components/Youtube/LineChart";

export const dummyData = [
  {
    id: 1,
    title: "Exploring Hidden Gems: Uncharted Destinations",
    totalViews: 56789,
    totalLikes: 1200,
    totalDislikes: 500,
    totalComments: 350,
  },
  {
    id: 2,
    title: "Epic Food Adventure: Tasting Exotic Flavors Around the Globe",
    totalViews: 98765,
    totalLikes: 2500,
    totalDislikes: 300,
    totalComments: 420,
  },
  {
    id: 3,
    title: "Time-Lapse Cityscape: 24 Hours in the Heart of Metropolis",
    totalViews: 123456,
    totalLikes: 3000,
    totalDislikes: 150,
    totalComments: 680,
  },
  {
    id: 4,
    title: "DIY Adventure: Crafting the Ultimate Treehouse Oasis",
    totalViews: 8765,
    totalLikes: 340,
    totalDislikes: 50,
    totalComments: 210,
  },
  {
    id: 5,
    title: "Quest for Mythical Creatures: Deep in the Enchanted Forest",
    totalViews: 65432,
    totalLikes: 890,
    totalDislikes: 120,
    totalComments: 530,
  },
  {
    id: 6,
    title: "Tech Unboxed: Unveiling the Latest Gadgets of the Future",
    totalViews: 54321,
    totalLikes: 750,
    totalDislikes: 90,
    totalComments: 460,
  },
  {
    id: 7,
    title: "Adrenaline Rush: Conquering Fear in Extreme Sports Madness",
    totalViews: 43210,
    totalLikes: 630,
    totalDislikes: 70,
    totalComments: 390,
  },
  {
    id: 8,
    title: "Behind the Scenes Magic: Creating Movie Wonders in Hollywood",
    totalViews: 87654,
    totalLikes: 1050,
    totalDislikes: 180,
    totalComments: 740,
  },
  {
    id: 9,
    title: "Mind-Bending Illusions: Can You Trust Your Eyes?",
    totalViews: 9876,
    totalLikes: 420,
    totalDislikes: 60,
    totalComments: 280,
  },
  {
    id: 10,
    title: "Record-Breaking Challenges: Pushing Limits to the Extreme",
    totalViews: 76543,
    totalLikes: 1320,
    totalDislikes: 140,
    totalComments: 570,
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
        <RecentVideos />
        <LineChart />
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
