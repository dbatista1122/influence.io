import DashboardHeader from "./DashboardHeader";
import { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [currentSocialMedia, setCurrentSocialMedia] = useState("Analytics");

  function handleCurrentSocialMedia(socialMedia) {
    setCurrentSocialMedia(socialMedia);
  }

  return (
    <>
      <div className="flex">
        <Sidebar
          handleCurrentSocialMedia={handleCurrentSocialMedia}
          currentSocialMedia={currentSocialMedia}
        />

        <main className="ml-20 w-full">
          <div>
            <DashboardHeader currentPage={currentSocialMedia} />
          </div>
          <div className="m-2">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
