import Link from "next/link";

import { TbTargetArrow } from "react-icons/tb";
import {
  SiGoogleanalytics,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiTwitter,
} from "react-icons/si";

const Sidebar = ({ handleCurrentSocialMedia, currentSocialMedia }) => {
  return (
      <div className="w-20 h-auto p-4 bg-white border-r-[1px] flex flex-col justify-between shadow-lg">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg shadow-md text-white p-3 rounded-lg inline-block ">
              <TbTargetArrow size={20} />
            </div>
          </Link>

          <span className="border-b-[1px] border-gray-200 w-full p-2 mb-4"></span>

          <SocialMediaLinkButton
            dashboardPage={"/dashboard/analytics"}
            socialMedia={"Analytics"}
            socialMediaIcon={<SiGoogleanalytics size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
          <SocialMediaLinkButton
            dashboardPage={"/dashboard/facebook"}
            socialMedia={"Facebook"}
            socialMediaIcon={<SiFacebook size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
          <SocialMediaLinkButton
            dashboardPage={"/dashboard/instagram"}
            socialMedia={"Instagram"}
            socialMediaIcon={<SiInstagram size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
          <SocialMediaLinkButton
            dashboardPage={"/dashboard/tiktok"}
            socialMedia={"Tik Tok"}
            socialMediaIcon={<SiTiktok size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
          <SocialMediaLinkButton
            dashboardPage={"/dashboard/youtube"}
            socialMedia={"Youtube"}
            socialMediaIcon={<SiYoutube size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
          <SocialMediaLinkButton
            dashboardPage={"/dashboard/twitter"}
            socialMedia={"Twitter"}
            socialMediaIcon={<SiTwitter size={20} />}
            setSocialMedia={handleCurrentSocialMedia}
            currentSocialMedia={currentSocialMedia}
          />
        </div>
      </div>
  );
};

function SocialMediaLinkButton({
  dashboardPage,
  socialMedia,
  socialMediaIcon,
  setSocialMedia,
  currentSocialMedia,
}) {
  return (
    <Link href={dashboardPage}>
      <div
        className={
          currentSocialMedia === socialMedia
            ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg shadow-md text-white cursor-pointer my-2 p-3 rounded-lg inline-block"
            : "bg-gray-300 hover:bg-gray-400 hover:shadow-lg shadow-md cursor-pointer my-2 p-3 rounded-lg inline-block"
        }
        onClick={() => setSocialMedia(socialMedia)}
      >
        {socialMediaIcon}
      </div>
    </Link>
  );
}

export default Sidebar;
