
export default async function handler(req, res) {
    if(req.method !== "POST") {
        res.send({ message: "Method not allowed."})
    }

    try {
            
        var key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        const { channel } = JSON.parse(req.body)
        const part = "statistics,snippet"
        var address = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${channel}&key=${key}`

        const response = await fetch(address, {
            method: 'GET'
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
