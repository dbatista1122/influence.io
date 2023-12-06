import RootLayout from "@/components/RootLayout";
import DashboardLayout from  "@/components/DashboardLayout";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {FaTwitter} from "react-icons/fa";
import { getServerSession } from "next-auth";

const TwitterAnalytics = () => {
  const [hasTwitterClient, setHasTwitterClient] = useState(false);
  const [hasCheckedDatabase, setHasCheckedDatabase] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const checkAccessTokenInDatabase = async () => {
    const response = await fetch(`/api/twitter/getAccessToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok) {
      const responseData = await response.json();
      setAccessToken(responseData.accountToken.accessToken);
      setHasTwitterClient(true);
    }
    setHasCheckedDatabase(true);
  };

  useEffect(() => {
    checkAccessTokenInDatabase();
  }, []);

  return (
    <div>
    {hasCheckedDatabase &&
      (!hasTwitterClient ? (
        <TwitterLoginButton
          accessToken={accessToken}
          setHasTwitterClient={setHasTwitterClient}
          setAccessToken={setAccessToken}
        />
      ) : (
        <div>
          <TwitterAnalyticsData accessToken={accessToken}/>
        </div>
      ))}
  </div>
  );
};

function TwitterAnalyticsData ({ accessToken}){
  const [retweet_count, setTotalRT] = useState(0);
  const [reply_count, setTotalReply] = useState(0);
  const [like_count, setTotalLike] = useState(0);
  const [impressions, setTotalImpressions] = useState(0);

  async function getApiData(){
    const res = await fetch(`/api/twitter/getApiData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken
      })
    });
    const response = await res.json();
    setTotalRT(response.retweet_count);
    setTotalReply(response.reply_count);
    setTotalLike(response.like_count);
    setTotalImpressions(response.impressions);
  }
  getApiData();

  return (
    <div className="flex flex-col m-auto p-10">
      <div className="flex felx-row justify-between p-5">
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Retweets</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{1}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Replies</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{2}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Likes</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{6}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Impressions</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{241}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Engagements</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{14}</h3>
        </div>
        <div className="items-center w-3/12 p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
          <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Link Clicks</h4>
          <h3 className="mb-3 font-xl text-gray-700 dark:text-gray-400">{"null"}</h3>
        </div>
      </div>
    </div>
  );
}

function TwitterLoginButton({
  setHasTwitterClient,
  setAccessToken,
}) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
  const redirectUri = "http://localhost:3000/dashboard/twitter";
  const grant_type = "authorization_code";
  const {code_Challenge, code_Verifier} = "DJ1dvk596vpAxF2_Fr0yJVNXNmCRP4sUSUKsB11n2PTQL-Ir";
  
  const initiateTwitterLogin = () => {
    const state = "-E3aQjXDb7EzE6ZnjFCXhYW0PCkmcNBLP3Es5GGFIsk";
    const params = "csrf=true";
    const twitterLoginUrl = `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&scope=users.read%20tweet.read+offline.access&response_type=code&redirect_uri=${redirectUri}&state=${params}&code_challenge=${code_Challenge}&code_challenge_method=plain`;
    window.location.href = twitterLoginUrl;
  };

  const handleTwitterCallback = async () => {
    const code = router.query.code;
    if (code) {
      const response = await fetch("/api/twitter/getAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          grant_type,
          clientId,
          redirectUri,
          code_Verifier,
        }).toString(),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAccessToken(responseData.access_token);
        setHasTwitterClient(true);
      } else {
        const errorMessage = await response.text();
        console.error(`Failed to get access token: ${errorMessage}`);
      }
    }
  };

  useEffect(() => {
    handleTwitterCallback();
  }, [router.query.code]);

  return (
    <div className="flex flex-col p-5 items-center">
      <div className=" p-5 items-center">
        <button
          onClick={() => initiateTwitterLogin()}
          className="flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover-bg-gray-600 hover-text-white"
        >
          <div>Add Twitter Account</div>
          <FaTwitter className="text-lg" />
        </button>
      </div>
    </div>
  );
}

TwitterAnalytics.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default TwitterAnalytics;