import RootLayout from "@/components/RootLayout";
import DashboardLayout from "@/components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";
import TopCard from '@/components/Instagram/TopCard';
import LineChart from '@/components/Instagram/LineChart';

const FacebookAnalytics = () => {
  const [hasFacebookClient, setHasFacebookClient] = useState(false);
  const [hasCheckedDatabase, setHasCheckedDatabase] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const checkAccessTokenInDatabase = async () => {
    // Check if access token exists in the database
    const response = await fetch(`/api/facebook/getAccessToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      setAccessToken(responseData.accountToken.accessToken);
      setHasFacebookClient(true);
    }
    setHasCheckedDatabase(true);
  };

  // Check for access token in database before page is rendered
  useEffect(() => {
    checkAccessTokenInDatabase();
  }, []);

  return (
    <div>
      {hasCheckedDatabase &&
        (!hasFacebookClient ? (
          <FacebookLoginButton
            accessToken={accessToken}
            setHasFacebookClient={setHasFacebookClient}
            setAccessToken={setAccessToken}
          />
        ) : (
          <div>
            <FacebookAnalyticsData 
              accessToken={accessToken}
              setHasFacebookClient={setHasFacebookClient}
              setAccessToken={setAccessToken}
            />
          </div>
        ))}
    </div>
  );
};

function FacebookAnalyticsData({ accessToken, setHasFacebookClient, setAccessToken }) {
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [talkingAboutCount, setTalkingAboutCount] = useState(0);
  const [postEngagments, setPostEngagements] = useState([]);
  const [impressions, setImpressions] = useState([]);
  const [totalViews, setTotalViews] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getApiData(accessToken);
    loadDateDefault();
  }, [])

  async function getApiData(accessToken) {
    const res = await fetch(`/api/facebook/getApiData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        startDate: startDate,
        endDate: endDate,
        usePlaceholderData: true,
      })
    });

    const { totalFollowers, totalRatings, talkingAboutCount, postEngagments, impressions, totalViews } = await res.json();
    setTotalFollowers(totalFollowers);
    setTotalRatings(totalRatings);
    setTalkingAboutCount(talkingAboutCount);
    setPostEngagements(postEngagments);
    setImpressions(impressions);
    setTotalViews(totalViews);
  }

  async function handleLogout() {
    const response = await fetch('/api/facebook/getAccessToken', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setAccessToken("");
      setHasFacebookClient(false);
    } else {
      console.error(`Failed to delete access token: ${response}`);
    }
  }

  function loadDateDefault() {
    const date = new Date();
    const prevDate = new Date(date - (20 * 1000 * 60 * 60 * 24)) // Start date will be set to 20 days prior

    setEndDate(date.toISOString().split("T")[0]);
    setStartDate(prevDate.toISOString().split("T")[0]);
  }

  return (
    <div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-4 p-2 justify-between">
        <TopCard value={totalFollowers} trackedDataName={'Followers'} />
        <TopCard value={totalRatings} trackedDataName={'Ratings'} />
        <TopCard value={talkingAboutCount} trackedDataName={'People Talking About This'} />
      </div>

      <div className="flex row-span-2 gap-4 p-2 justify-center">
        <div className="flex text-sm justify-between border p-4 rounded-lg shadow-md">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex text-sm justify-between border p-4 rounded-lg shadow-md">
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {startDate && endDate ? (
        <div className="p-2 gap-4">
          <LineChart titles={["Post Engagements", "Impressions", "Page Views"]} lists={[postEngagments, impressions, totalViews]} startDate={startDate} endDate={endDate} />
        </div>
      ) : null}

      <div className="flex justify-center p-2">
        <button
          onClick={handleLogout}
          className="border-2 rounded-full text-sm px-4 py-1 inline-block hover:bg-red-500 hover:text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

function FacebookLoginButton({
  setHasFacebookClient,
  setAccessToken,
}) {
  const router = useRouter();

  const initiateFacebookLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
    const redirectUri = window.location.origin + "/dashboard/facebook";
    const params = "csrf=true";
    const facebookLoginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${params}`;
    window.location.href = facebookLoginUrl;
  };

  const handleFacebookCallback = async () => {
    // get code from url after redirect
    const code = router.query.code;
    const redirectUri = window.location.origin + "/dashboard/facebook";

    // send a POST request to backend with code. Backend will send GET request to Facebook API and retrieve the access_token
    if (code) {
      const response = await fetch("/api/facebook/getAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAccessToken(responseData.accountToken.accessToken);
        setHasFacebookClient(true);
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to get access token: ${errorMessage}`);
      }
    }
  };

  // Check for Facebook callback when code is added to url after FB login redirect
  useEffect(() => {
    handleFacebookCallback();
  }, [router.query.code]);

  return (
    <div className="flex flex-col p-5 items-center">
      <div className=" p-5 items-center">
        <button
          onClick={() => initiateFacebookLogin()}
          className="flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover-bg-gray-600 hover-text-white"
        >
          <div>Add Facebook Account</div>
          <FaFacebook className="text-lg" />
        </button>
      </div>
    </div>
  );
}

FacebookAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default FacebookAnalytics;
