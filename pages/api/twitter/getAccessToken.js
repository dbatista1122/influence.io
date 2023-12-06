
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

/*
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import axios from 'axios';

async function getUserId(id) {
    const userId = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
        },
    });
    return userId.id;
}

async function getTwitterAccessToken(id){
    const userId = await getUserId(id);

    var accountToken = await prisma.AccountToken.findFist({
        where: {
            userId: userId,
            name: "twitter",
        },
    });

    if(accountToken) {
        if(accountToken.expires < Date.now()){
            await prisma.AccountToken.delete({
                where: {
                    id: accountToken.id,
                },
            });
            accountToken = null;
        }
    }
    return accountToken;
}

export default async function handler(req, res) {
    const session = await getServerSession(req, res);
    const id = session.user.id;

    if(req.method === "GET") {
        try {
            const accountToken = await getTwitterAccessToken(id);
            if(accountToken){
                return res.status(200).json({accountToken});
            } else {
                return res.status(404).json({accountToken});
            }
        } catch (error) {
            console.error("Error fetching Twitter access token from database: ", error.message);
            return res.status(500).json({ message: "Internal server error"});
        }
    }

    if (req.method === "POST") {
        const { code, grant_type, clientId, redirectUri, code_Verifier } = req.body;
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

            if(!response.ok) {
                const errorMessage = await response.text();
                return res.status(response.status).json({ message: `Failed to fetch Twitter access token from API: ${errorMessage}`});
            }
            const result = await response.json();
            
            const userId = await getUserId(id);
            const accountToken = await prisma.AccountToken.create({
                data: {
                    userId: userId,
                    name: "twitter",
                    accessToken: result.access_token,
                    tokenType: result.token_type,
                    expires: new Date(Date.now() + result.expires_in * 1000),
                },
            });
            return res.status(200).json({accountToken});
        } catch (error) {
            console.error("Error fetching Twitter access token: ", error.message);
            return res.status(500).json({ message: "Internal server error"});
        }
    }
}
*/
