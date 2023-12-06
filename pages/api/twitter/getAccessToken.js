import axios from 'axios';
import {getApiData} from './getApiData';
import {getServerSession} from "next-auth";

export default async function handler(req, res) {
    const session = await getServerSession(req, res)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { code, grant_type, clientId, redirectUri, code_Verifier } = req.body;
  //console.log("code_verifier: );

  try {
    const url = 'https://api.twitter.com/2/oauth2/token';
    
    const data = new URLSearchParams();
    data.append('code', code);
    data.append('grant_type', grant_type);
    data.append('client_id', clientId);
    data.append('redirect_uri', redirectUri);
    data.append('code_verifier', code_Verifier);
    
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      const responseData = response.data;
      const access_token = responseData.access_token;
      const refresh_token = responseData.refresh_token;
      // Handle the response data as needed. 
      await getApiData(access_token);
      res.status(200).json(responseData);
      session.user.access_token = access_token;
    } else {
      // Handle other status codes
      res.status(response.status).end();
    }
  } catch (error) {
    // Handle errors
    console.error('Error in access token request:', error);
    res.status(500).end();
  }
}