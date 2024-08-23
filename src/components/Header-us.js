import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-zinc-800 px-6 h-20 shadow-lg w-full flex items-center">
      <div className="flex w-1/3">
        <Link href="/" className="flex items-center">
          <Image
            src="/ConnecTo-logo-horizontal2.png"
            alt="ConnecTo Logo"
            width={250}
            height={50}
          />
        </Link>
      </div>
      <div className="flex w-1/3 justify-center">
        <Link
          className="px-4 py-2 text-xs md:text-base rounded-xl font-semibold text-white hover:text-sky-400 transition-colors duration-300 ease-in-out"
          href="/"
        >
          Home
        </Link>
      </div>
      <div className="flex w-1/3"></div>{" "}
    </header>
  );
}
