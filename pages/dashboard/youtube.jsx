import React, { useState, useEffect, useRef } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import RootLayout from '@/components/RootLayout';
import DashboardLayout from '@/components/DashboardLayout';
import TopCard from '@/components/TopCard';
import LineChart from '@/components/Youtube/LineChart';

function Analytics() {
  const [hasGoogleClient, setHasGoogleClient] = useState(false);
  const [hasCheckedDatabase, setHasCheckedDatabase] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const checkAccessTokenInDatabase = async () => {
    const response = await fetch(`/api/youtube/getAccessToken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      setAccessToken(responseData.accountToken.accessToken);
      setHasGoogleClient(true);
    }

    setHasCheckedDatabase(true);
  };

  useEffect(() => {
    checkAccessTokenInDatabase();
  }, []);

  return (
    <RootLayout>
      <DashboardLayout>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {hasCheckedDatabase &&
            (!hasGoogleClient ? (
              <YoutubeLoginButton setHasGoogleClient={setHasGoogleClient} setAccessToken={setAccessToken} />
            ) : (
              <YoutubeAnalytics setHasGoogleClient={setHasGoogleClient} accessToken={accessToken} />
            ))}
        </GoogleOAuthProvider>
      </DashboardLayout>
    </RootLayout>
  );
}

function YoutubeLoginButton({ setHasGoogleClient, setAccessToken }) {
  const createAccessToken = async (codeResponse) => {
    if (codeResponse) {
      const response = await fetch('/api/youtube/getAccessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleToken: codeResponse,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAccessToken(responseData.accountToken.accessToken);
        setHasGoogleClient(true);
      } else {
        const errorMessage = await response.text();
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => await createAccessToken(codeResponse),
    scope: 'https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtube',
  });

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => login()}
        className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white"
      >
        <div>Add YouTube Account</div>
        <FaGoogle className="text-lg" />
      </button>
    </div>
  );
}

function YoutubeAnalytics({ setHasGoogleClient, accessToken }) {
  const [totalSubs, setTotalSubs] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalVideo, setTotalVideos] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const channelURL = useRef(null);

  useEffect(() => {
    loadChannelData();
    loadDateDefault();
  }, []);

  async function handleLogout() {
    setHasGoogleClient(false);

    fetch('/api/youtube/getAccessToken', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      });
  }

  async function getChannelId() {
    const res = await fetch('/api/youtube/getChannelId', {
      method: 'POST',
      body: JSON.stringify({
        bearerToken: accessToken,
      }),
    });

    const response = await res.json();
    const channelId = response.data.items[0].id;

    return channelId;
  }

  async function loadChannelData() {
    const channel = await getChannelId();

    const res = await fetch('/api/youtube/getChannelData', {
      method: 'POST',
      body: JSON.stringify({
        channel: channel,
      }),
    });

    const response = await res.json();

    const channelName = response.data.items[0].snippet.title;
    setTotalViews(response.data.items[0].statistics.viewCount);
    setTotalSubs(response.data.items[0].statistics.subscriberCount);
    setTotalVideos(response.data.items[0].statistics.videoCount);

    const customUrl = response.data.items[0].snippet.customUrl;
    channelURL.current = `https://www.youtube.com/${customUrl}`;
  }

  function loadDateDefault() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    setEndDate(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
    setStartDate(`${year - 1}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
  }

  return (
    <div className="flex flex-col m-auto p-10 gap-10">
      <div className="flex w-5/6 gap-5 m-auto justify-between">
        <TopCard value={totalSubs} trackedDataName={'Total Subscribers'} />
        <TopCard value={totalViews} trackedDataName={'Total Views'} />
        <TopCard value={totalVideo} trackedDataName={'Total Videos'} />
      </div>

      <div className="flex w-full m-auto text-sm gap-5 max-w-2xl">
        <div className="flex w-full text-sm col-span-1 justify-between border p-4 rounded-lg shadow-md">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex w-full text-sm justify-between border p-4 rounded-lg shadow-md">
          <label className="ml-4 mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {startDate && endDate ? (
        <div className="flex flex-col m-auto w-5/6 gap-10">
          <LineChart accessToken={accessToken} metric={'views'} startDate={startDate} endDate={endDate} />
          <LineChart accessToken={accessToken} metric={'likes'} startDate={startDate} endDate={endDate} />
          <LineChart accessToken={accessToken} metric={'subscribersGained'} startDate={startDate} endDate={endDate} />
        </div>
      ) : null}

      <div className="flex flex-row">
        <a
          ref={channelURL}
          href={channelURL.current}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-auto item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white"
        >
          <div>Go to YouTube</div>
        </a>
        <button
          onClick={handleLogout}
          className="ml-auto item-center border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white"
        >
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
}

export default Analytics;
