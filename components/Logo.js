import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex h-full items-center bg-red">
      <Image
        src="/static/Logo.png"
        alt=""
        width={30}
        height={30}
        className="cursor-pointer"
        priority
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Influence.io</span>
    </Link>
  );
}
