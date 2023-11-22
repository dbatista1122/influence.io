import RootLayout from "@/components/RootLayout";
import DashboardLayout from "@/components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";

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
            <FacebookAnalyticsData accessToken={accessToken}/>
          </div>
        ))}
    </div>
  );
};

function FacebookAnalyticsData({accessToken}) {

  const [totalFriends, setTotalFriends] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  async function getApiData() {
    // Make API call to backend to retrieve data from Facebook API
    const res = await fetch(`/api/facebook/getApiData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken
      })
    });

    const response = await res.json();
    setTotalFriends(response.totalFriends);
    setTotalLikes(response.totalLikes);
    setTotalPosts(response.totalPosts);
  }

  getApiData();

  return (
    <div className="flex flex-col m-auto p-10">
      <div className="flex felx-row justify-between p-5">
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Friends</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{totalFriends}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Total Likes</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{totalLikes}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Total Posts</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{totalPosts}</h3>
        </div>
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
