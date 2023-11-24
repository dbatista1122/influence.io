import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [currentSocialMedia, setCurrentSocialMedia] = useState();

  function handleCurrentSocialMedia(socialMedia) {
    setCurrentSocialMedia(socialMedia);
  }

  useEffect(function () {
    setCurrentSocialMedia("Analytics");
  }, []);

  return (
    <main className="flex w-full min-h-screen">
      <Sidebar
        handleCurrentSocialMedia={handleCurrentSocialMedia}
        currentSocialMedia={currentSocialMedia}
      />
      <div className="w-5/6 mx-auto py-10">{children}</div>
    </main>
  );
};

export default DashboardLayout;
