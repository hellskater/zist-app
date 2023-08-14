import Image from 'next/image';
import Link from 'next/link';

import ProfileMenu from './profile-menu';

const Header = () => {
  return (
    <header className="py-4 px-14 fixed top-0 bg-[#0a0a0a] z-50 w-full bg-opacity-80 flex justify-between items-center">
      <Link href="/">
        <section className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="zist logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <h1 className="text-gray-300 text-2xl tracking-widest font-bold">
            ZIST
          </h1>
        </section>
      </Link>
      <ProfileMenu />
    </header>
  );
};

export default Header;
