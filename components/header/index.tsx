'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiMenu4Line } from 'react-icons/ri';
import OutClick from 'react-outclick';
import { useSession } from 'next-auth/react';

import Sidebar from '../dashboard/sidebar';

import ProfileMenu from './profile-menu';

const Header = () => {
  const { data: session } = useSession();

  const [showSideBar, setShowSideBar] = useState(false);

  const [scrolledBelowThreshold, setScrolledBelowThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setScrolledBelowThreshold(true);
      } else {
        setScrolledBelowThreshold(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed">
      {!scrolledBelowThreshold && (
        <>
          <header className="p-4 pl-6 pr-6 sm:pl-10 xs:pl-3 fixed top-0 bg-[#0a0a0a] z-50 w-full bg-opacity-80 flex justify-between items-center">
            <div className="flex items-center  ">
              {session && (
                <RiMenu4Line
                  onClick={() => setShowSideBar(!showSideBar)}
                  className="w-12 h-12 mr-2 cursor-pointer transition-all duration-100 ease-in-out delay-100 hover:bg-[#262525] hover:text-yellow-500 rounded-l lg:hidden"
                />
              )}
              <Link href="/">
                <section className="flex items-center gap-2 transition-all duration-500 ease-in-out delay-500">
                  <Image
                    src="/logo.png"
                    alt="zist logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <h1 className="hidden sm:block text-gray-300 text-2xl tracking-widest font-bold ">
                    ZIST
                  </h1>
                </section>
              </Link>
            </div>
            <ProfileMenu />
          </header>
          <div className="absolute left-9 top-24 transition-all duration-300 delay-100 lg:hidden">
            {showSideBar && (
              <OutClick onOutsideClick={() => setShowSideBar(false)}>
                <Sidebar />
              </OutClick>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
