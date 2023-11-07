import Link from "next/link";
import RootLayout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import { FaGoogle, FaFacebookF, FaTwitter, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import React from 'react'
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function Analytics() {

  async function handleSubmit(credentialResponse) {
    console.log(credentialResponse);


    async function getData() {
      const statsData = fetchData(statisticsURL);
      const uploadsData = fetchData(uploadsURL);
  
      return {
        stats: await statsData,
        videos: await uploadsData,
      };
    }
  }
  const hasGoogleClient = true;

  return(
    <RootLayout>
      <DashboardLayout>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>

        {hasGoogleClient && (
            <YoutubeLoginButton />      
        )}
        {!hasGoogleClient && (
          <>
            Show Data Here
          </>
        )}     
      </GoogleOAuthProvider>
    </DashboardLayout>
  </RootLayout>

  );
};

function YoutubeLoginButton() {

  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    scope: "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtube",  
  });

  return (
    <div className="flex flex-col p-5 items-center">
      <div className=" p-5 items-center">
            <button  onClick={() => login()} className="flex flex-row gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover:bg-gray-600 hover:text-white">
              <div>Add YouTube Account</div>
              <FaGoogle className="text-lg" />
            </button >
        </div>
    </div>
  
  );
}

function AccountInput({ email, password, setEmailAddress, setPassword, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col p-5 items-center">
        <div className="bg-gray-100 w-64 flex items-center border-2 rounded-full mb-5">
          <FaRegEnvelope className="text-gray-400 m-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={email}
            onChange={(evnt) => setEmailAddress(evnt.target.value)}
            required
          />
        </div>

        <div className="bg-gray-100 w-64 flex items-center border-2 rounded-full mb-5">
          <MdLockOutline className="text-gray-400 m-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-100 outline-none text-sm flex-1"
            value={password}
            onChange={(evnt) => setPassword(evnt.target.value)}
            required
          />
        </div>

        <button className="flex gap-3 item-center border-2 rounded-full text-sm px-5 py-2 inline-block hover:bg-gray-600 hover:text-white">
          <div>Add YouTube Account</div>
          <FaGoogle className="text-sm" />
        </button>

      </div>
    </form>
  );
}

export default Analytics;
