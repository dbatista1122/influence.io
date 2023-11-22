export default async function handler(req, res) {
    if(req.method !== "POST") {
        res.send({ message: "Method not allowed."})
    }

    try {
        const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        const address = `https://youtube.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${key}`
        const { bearerToken } = JSON.parse(req.body);

        const response = await fetch(address, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        })

        if (!response.ok) {
            const errorMessage = await response.text();
            return res.status(response.status).json({ message: `Failed to fetch YouTube channel: ${errorMessage}` });
        }

        const data = await response.json();

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching YouTube channel:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
  
}