'use client'

import RootLayout from "@/components/RootLayout";
import DashboardLayout from "@/components/DashboardLayout";
import TopCardsLayout from "@/components/TopCardsLayout";
import TopCard from "@/components/TopCard";
import BarChart from "@/components/Youtube/BarChart";
import RecentVideos from "@/components/Youtube/RecentVideos";
import LineChart from "@/components/Youtube/LineChart";
import { FaGoogle } from "react-icons/fa"
import React, { useState, useEffect, useRef } from 'react'
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google'

function Analytics() {

  const [hasGoogleClient, setHasGoogleClient] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  return (
    <RootLayout>
      <DashboardLayout>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
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
    <div className="flex flex-col items-center">
        <button onClick={() => login()} className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white">
          <div>Add YouTube Account</div>
          <FaGoogle className="text-lg" />
        </button>
    </div>
  );
}

function YoutubeAnalytics({ setHasGoogleClient, accessToken }) {

  const [totalSubs, setTotalSubs] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const [totalVideo, setTotalVideos] = useState(0)
  const channelURL = useRef(null)

  useEffect(() => {
    loadChannelData();
  }, []);

  function handleLogout() {
    setHasGoogleClient(false);
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
    setTotalViews(response.data.items[0].statistics.viewCount);
    setTotalSubs(response.data.items[0].statistics.subscriberCount);
    setTotalVideos(response.data.items[0].statistics.videoCount);

    const customUrl = response.data.items[0].snippet.customUrl;
    channelURL.current = `https://www.youtube.com/${customUrl}`;

    }

  return (
    <div className="flex flex-col m-auto p-10">
      <div>
        <div className="flex w-full gap-5 justify-between"> 
            <TopCard
              value={totalSubs}
              trackedDataName={"Total Subscribers"}
            />
            <TopCard
              value={totalViews}
              trackedDataName={"Total Views"}
            />
            <TopCard
              value={totalVideo}
              trackedDataName={"Total Videos"}
            />
        </div>
        

        <div className="items-center p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          {/* <BarChart /> */}
          {/* <RecentVideos /> */}
          <LineChart bearerToken={accessToken} />
        </div>
      </div>      

      <div className="flex flex-row p-5 pt-20">
        <a 
          ref={channelURL}
          href={channelURL.current}
          target="_blank"
          rel="noopener noreferrer" 
          className="mr-auto item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white">
          <div>Go to YouTube</div>
        </a>
        <button onClick={handleLogout} className="ml-auto item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white">
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
}

export default Analytics;
