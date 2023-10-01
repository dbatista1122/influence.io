import Link from "next/link";
import Logo from "./Logo";

const ProfileFooter = () => {
  return (
    <footer className="flex items-center justify-between">
      <Logo />
      <Link href="/" className="flex gap-4 items-center">
        <span>Influence.io</span>
      </Link>

      <div>
        <p>&copy; {new Date().getFullYear().toString()} by Influence.io</p>
      </div>
    </footer>
  );
};

export default ProfileFooter;
