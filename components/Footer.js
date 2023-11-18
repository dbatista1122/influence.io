import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-8 shadow-3xl">
      <div className=" flex flex-col container mx-auto md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold">Influence.io</h3>
          <p className="text-sm">Built at the University of Florida</p>
        </div>
        <Link href="/terms"> Terms of Use </Link>
        <Link href="/privacy"> Privacy Policy </Link>
        <p>&copy; {new Date().getFullYear().toString()} by Influence.io</p>
      </div>
    </footer>
  );
};

export default Footer;
