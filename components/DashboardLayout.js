import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-100 p-2 rounded block text-sm ${
        active ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex gap-8">
      <aside className="flex-[2]">
        <nav>
          <ul className="grid gap-3 pt-6">
            <li className="">
              <ActiveMenuLink href="/dashboard/analytics">Accounts</ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/facebook">Facebook</ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/instagram">Instagram</ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/tiktok">TikTok</ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/youtube">Youtube</ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/twitter">Twitter</ActiveMenuLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-screen pt-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
