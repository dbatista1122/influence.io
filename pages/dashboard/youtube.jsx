import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { FaGoogle } from "react-icons/fa";
import React, { useState } from 'react'
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';

function Analytics() {

  const [hasGoogleClient, setHasGoogleClient] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  return (
    <RootLayout>
      <DashboardLayout>
        <GoogleOAuthProvider clientId="516636552-eemg5hgaqg6ms45n1lcfdmvvvrq4dhlp.apps.googleusercontent.com">
          {!hasGoogleClient ? (
              <YoutubeLoginButton 
              setHasGoogleClient={setHasGoogleClient} 
              setAccessToken={setAccessToken}/>
          ) : (
            <YoutubeAnalytics
             setHasGoogleClient={setHasGoogleClient} 
             accessToken={accessToken}/>
          )}
        </GoogleOAuthProvider>
      </DashboardLayout>
    </RootLayout>
  );
}

function YoutubeLoginButton({ setHasGoogleClient, setAccessToken }) {
  
  async function handleSuccess(codeResponse, setAccessToken, setHasGoogleClient) {
    const access_token = codeResponse.access_token
    setAccessToken(String(access_token))
    setHasGoogleClient(true)
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => await handleSuccess(codeResponse, setAccessToken, setHasGoogleClient),
    scope: "https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtube",  
  });

  return (
    <div className="flex flex-col p-5 items-center">
      <div className=" p-5 items-center">
        <button onClick={() => login()} className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover-bg-gray-600 hover-text-white">
          <div>Add YouTube Account</div>
          <FaGoogle className="text-lg" />
        </button>
      </div>
    </div>
  );
}

function YoutubeAnalytics({ setHasGoogleClient, accessToken }) {

  function handleLogout() {
    setHasGoogleClient(false); // Set the user as logged out
    googleLogout();
  }

  async function getChannelId() {
    
    const res = await fetch("/api/youtube/getChannelId", {
      method: 'POST',
      body: JSON.stringify({
        bearerToken: accessToken
      })
    });

    const response = await res.json()
    const channelId = response.data.items[0].id
    
    return channelId

  }


  async function loadChannelData() {
    const channel = await getChannelId()
    
    const res = await fetch("/api/youtube/getChannelData", {
      method: 'POST',
      body: JSON.stringify({
        channel: channel
      })
    });

    const response = await res.json()
    
    const channelName = response.data.items[0].snippet.title;
    const viewCount = response.data.items[0].statistics.viewCount;
    const subscriberCount = response.data.items[0].statistics.subscriberCount;
    const videoCount = response.data.items[0].statistics.videoCount;

    const customUrl = response.data.items[0].snippet.customUrl;
    const channelUrl = `https://www.youtube.com/${customUrl}`;

    // Output the results
    console.log("Channel Name:", channelName);
    console.log("View Count:", viewCount);
    console.log("Subscriber Count:", subscriberCount);
    console.log("Video Count:", videoCount);
    console.log("Channel URL:", channelUrl);

  }

  return (
    <div className="flex flex-col p-5 items-center">
      <div className=" p-5 items-center">
        Youtube analytics
        <button onClick={loadChannelData} className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover-bg-gray-600 hover-text-white">
          <div>LoadData</div>
        </button>
        <button onClick={handleLogout} className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover-bg-gray-600 hover-text-white">
          <div>Logout</div>
          <FaGoogle className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Analytics;
