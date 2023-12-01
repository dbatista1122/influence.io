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

async function getPageDataBasic(accessToken, pageId, startDate, endDate) {
  var totalFollowers = 0;
  var totalRatings = 0;
  var talkingAboutCount = 0;

  const fields = "followers_count,rating_count,talking_about_count";
  const address = `https://graph.facebook.com/v18.0/${pageId}?fields=${fields}&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();

  totalFollowers = data.followers_count;
  totalRatings = data.rating_count;
  talkingAboutCount = data.talking_about_count;

  return { totalFollowers, totalRatings, talkingAboutCount };
}

async function getPageInsights(accessToken, pageId, startDate, endDate) {
  var postEngagments = [];
  var impressions = [];
  var totalViews = [];

  const metric = "page_post_engagements,page_impressions,page_views_total";
  const period = "day";
  const since = new Date(startDate).getTime() / 1000;
  const until = new Date(endDate).getTime() / 1000;
  const address = `https://graph.facebook.com/v18.0/${pageId}/insights?&metric=${metric}&period=${period}&since=${since}&until=${until}&access_token=${accessToken}`;
  const response = await fetch(address, {
    method: "GET",
  });

  const data = await response.json();

  postEngagments = data.data[0].values;
  impressions = data.data[1].values;
  totalViews = data.data[2].values;

  return { postEngagments, impressions, totalViews };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.send({ message: "Method not allowed." });
  }

  try {
    const { accessToken, startDate, endDate, usePlaceholderData } = req.body;

    if (usePlaceholderData) {
      const totalFollowers = 4518;
      const totalRatings = 357;
      const talkingAboutCount = 1284;
      const postEngagments = [
        1098, 678, 863, 1092, 992, 1203, 1178, 1403, 842, 1249, 1452, 1592,
        1482, 1982, 1827, 1632, 1364, 1568, 1689, 1754, 1678, 1489,
      ];
      const impressions = [
        8463, 6546, 7364, 1995, 8466, 10581, 9822, 4894, 5646, 12919, 11498,
        12984, 14216, 7612, 6564, 4269, 9843, 9853, 10698, 10198, 10715,
      ];
      const totalViews = [
        986, 665, 186, 897, 651, 751, 984, 964, 881, 468, 678, 846, 984, 1055,
        844, 465, 1067, 1167, 1988, 1549, 1298, 1649, 1983, 1887, 1689,
      ];

      return res.status(200).json({
        totalFollowers,
        totalRatings,
        talkingAboutCount,
        postEngagments,
        impressions,
        totalViews,
      });
    } else {
      const pageId = await getPageId(accessToken);

      const { totalFollowers, totalRatings, talkingAboutCount } =
        await getPageDataBasic(accessToken, pageId, startDate, endDate);

      const { postEngagments, impressions, totalViews } = await getPageInsights(
        accessToken,
        pageId,
        startDate,
        endDate
      );

      return res.status(200).json({
        totalFollowers,
        totalRatings,
        talkingAboutCount,
        postEngagments,
        impressions,
        totalViews,
      });
    }
  } catch (error) {
    console.error("Error fetching Facebook API data:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
