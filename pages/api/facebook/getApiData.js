export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.send({ message: "Method not allowed." });
  }

  try {
    const { accessToken } = req.body;
    var address = `https://graph.facebook.com/v18.0/me/friends?access_token=${accessToken}`;
    const response = await fetch(address, {
      method: "GET",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return res.status(response.status).json({
        message: `Failed to fetch Facebook data from API: ${errorMessage}`,
      });
    }

    const data = await response.json();

    const totalFriends = data["summary"]["total_count"];

    // Placeholder data, need to make additional API calls to populate
    const totalLikes = 1234;
    const totalPosts = 222;

    return res.status(200).json({ totalFriends, totalLikes, totalPosts });
  } catch (error) {
    console.error("Error fetching Facebook API data:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
