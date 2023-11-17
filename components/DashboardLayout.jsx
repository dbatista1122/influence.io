import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbTargetArrow } from "react-icons/tb";
import {
  SiGoogleanalytics,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiTwitter,
} from "react-icons/si";

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  ${
        active ? "text-blue-300 font-extrabold" : "text-white"
      }`}
    >
      {children}
    </Link>
  );
};

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex gap-8 bg-gray-500">
//       <aside className="">
//         <nav>
//           <ul className="grid gap-5 px-2.5 pt-5 items-center font-sans">
//             <li className="">
//               <ActiveMenuLink href="/dashboard/analytics">Accounts</ActiveMenuLink>
//             </li>
//             <li>
//               <ActiveMenuLink href="/dashboard/facebook">Facebook</ActiveMenuLink>
//             </li>
//             <li>
//               <ActiveMenuLink href="/dashboard/instagram">Instagram</ActiveMenuLink>
//             </li>
//             <li>
//               <ActiveMenuLink href="/dashboard/tiktok">TikTok</ActiveMenuLink>
//             </li>
//             <li>
//               <ActiveMenuLink href="/dashboard/youtube">Youtube</ActiveMenuLink>
//             </li>
//             <li>
//               <ActiveMenuLink href="/dashboard/twitter">Twitter</ActiveMenuLink>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="bg-gray-100 flex-[8] p-4 min-h-screen pt-6">{children}</main>
//     </div>
//   );
// };

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="bg-blue-400 text-white p-3 rounded-lg inline-block">
              <TbTargetArrow size={20} />
            </div>
          </Link>

          <span className="border-b-[1px] border-gray-200 w-full p-2 mb-4"></span>

          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/analytics"}
            socialMediaIcon={<SiGoogleanalytics size={20} />}
          />
          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/facebook"}
            socialMediaIcon={<SiFacebook size={20} />}
          />
          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/instagram"}
            socialMediaIcon={<SiInstagram size={20} />}
          />
          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/tiktok"}
            socialMediaIcon={<SiTiktok size={20} />}
          />
          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/youtube"}
            socialMediaIcon={<SiYoutube size={20} />}
          />
          <SocialMediaLinkButton
            socialMediaSite={"/dashboard/twitter"}
            socialMediaIcon={<SiTwitter size={20} />}
          />
        </div>
        <div></div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

function SocialMediaLinkButton({ socialMediaSite, socialMediaIcon }) {
  return (
    <Link href={socialMediaSite}>
      <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-2 p-3 rounded-lg inline-block">
        {socialMediaIcon}
      </div>
    </Link>
  );
}

export default DashboardLayout;
