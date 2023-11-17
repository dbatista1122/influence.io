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
    <div className="flex">
      <Sidebar
        handleCurrentSocialMedia={handleCurrentSocialMedia}
        currentSocialMedia={currentSocialMedia}
      />

      <main className="ml-20 w-full">
        <div className="m-2">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
