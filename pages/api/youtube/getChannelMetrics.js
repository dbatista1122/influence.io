export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed." });
    }

    try {
        const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        const { startDate, endDate, metrics, dimensions, bearerToken } = JSON.parse(req.body);
        const address = `https://youtubeanalytics.googleapis.com/v2/reports?startDate=${startDate}&endDate=${endDate}&ids=channel==MINE&metrics=${metrics}&key=${key}&dimensions=${dimensions}`;

        const response = await fetch(address, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        },
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            return res.status(response.status).json({ message: `Failed to fetch YouTube channel: ${errorMessage.error.message}` });
        }

        const data = await response.json();
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching metrics:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
    