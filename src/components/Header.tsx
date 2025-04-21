import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/auth-utils";

const Header = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="flex justify-center bg-white px-6 w-full h-20">
      <div className="flex justify-between items-center w-full h-full container">
        <div className="flex items-center gap-3 py-3 h-full">
          <Image
            src="/Logo-Sj.svg"
            alt="Logo Gobierno de San Juan"
            width={100}
            height={24}
          />
          <div className="bg-brand-600/50 rounded-3xl w-0.5 h-full"></div>
          <span className="w-12 font-semibold text-xs">Gobierno Digital</span>
        </div>
        {user && <LogoutButton />}
      </div>
    </header>
  );
};

export default Header;
