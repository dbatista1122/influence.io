async function getPageId(accessToken) {
  var pageId = 0;
  const address = `https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();
  if (data.data) {
    pageId = data.data[0].id;
  }
  return pageId;
}

async function getInstagramId(accessToken, pageId) {
  var instagramId = 0;
  const address = `https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();
  if (data.instagram_business_account) {
    instagramId = data.instagram_business_account.id;
  }
  return instagramId;
}

async function getInstagramDataBasic(accessToken, instagramId) {
  var totalFollowers = 0;
  var totalPosts = 0;
  const address = `https://graph.facebook.com/v18.0/${instagramId}?fields=followers_count,media_count&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();
  if (data) {
    totalFollowers = data.followers_count;
    totalPosts = data.media_count;
  }
  return { totalFollowers, totalPosts };
}

async function getInstagramDataInsightsTotalCount(
  accessToken,
  instagramId,
  startDate,
  endDate
) {
  var totalInteractions = 0;
  var totalLikes = 0;
  var totalProfileViews = 0;

  const metric = "total_interactions,likes,profile_views";
  const metricType = "total_value";
  const period = "day";
  const since = new Date(startDate).getTime() / 1000;
  const until = new Date(endDate).getTime() / 1000;
  const address = `https://graph.facebook.com/v18.0/${instagramId}/insights?&metric=${metric}&metric_type=${metricType}&period=${period}&since=${since}&until=${until}&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();

  totalInteractions = data.data[0].total_value.value;
  totalLikes = data.data[1].total_value.value;
  totalProfileViews = data.data[2].total_value.value;

  return { totalInteractions, totalLikes, totalProfileViews };
}

async function getInstagramDataInsightsTimeSeries(
  accessToken,
  instagramId,
  startDate,
  endDate
) {
  var impressions = [];
  var reach = [];

  const metric = "impressions,reach";
  const metricType = "time_series";
  const period = "day";
  const since = new Date(startDate).getTime() / 1000;
  const until = new Date(endDate).getTime() / 1000;
  const address = `https://graph.facebook.com/v18.0/${instagramId}/insights?&metric=${metric}&metric_type=${metricType}&period=${period}&since=${since}&until=${until}&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();
  impressions = data.data[0].values;
  reach = data.data[1].values;

  return { impressions, reach };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.send({ message: "Method not allowed." });
  }

  try {
    const { accessToken, startDate, endDate, usePlaceholderData } = req.body;

    if (usePlaceholderData) {
      const totalFollowers = 6732;
      const totalPosts = 346;
      const totalInteractions = 142023;
      const totalLikes = 98364;
      const totalProfileViews = 19093;
      const impressions = [
        6516, 6105, 5691, 6356, 7516, 6481, 6822, 7007, 7509, 7429, 7668, 8160,
        6541, 6841, 8839, 9192, 10656, 9979, 10416, 9985, 9823, 9234,
      ];
      const reach = [
        1239, 1389, 2348, 1792, 1956, 2134, 1678, 2212, 1890, 2085, 1567, 2467,
        2012, 1834, 2098, 1745, 1987, 2279, 1936, 2512, 1569, 2569, 3564,
      ];

      return res.status(200).json({
        totalFollowers,
        totalPosts,
        totalInteractions,
        totalLikes,
        totalProfileViews,
        impressions,
        reach,
      });
    } else {
      const pageId = await getPageId(accessToken);
      const instagramId = await getInstagramId(accessToken, pageId);

      const { totalFollowers, totalPosts } = await getInstagramDataBasic(
        accessToken,
        instagramId
      );

      const { totalInteractions, totalLikes, totalProfileViews } =
        await getInstagramDataInsightsTotalCount(
          accessToken,
          instagramId,
          startDate,
          endDate
        );

      const { impressions, reach } = await getInstagramDataInsightsTimeSeries(
        accessToken,
        instagramId,
        startDate,
        endDate
      );

      return res.status(200).json({
        totalFollowers,
        totalPosts,
        totalInteractions,
        totalLikes,
        totalProfileViews,
        impressions,
        reach,
      });
    }
  } catch (error) {
    console.error("Error fetching Instagram API data:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
