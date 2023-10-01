import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"https://img.logoipsum.com/262.svg"}
        alt=""
        width={170}
        height={41}
        className="cursor-pointer"
        priority
      />
    </Link>
  );
}
