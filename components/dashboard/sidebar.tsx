'use client';

import { BsCodeSlash } from 'react-icons/bs';
import { IoMdCreate } from 'react-icons/io';
// import { AiFillSetting } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const items = [
  {
    name: 'My Zists',
    Icon: <BsCodeSlash />,
    path: '/dashboard/my-zists',
  },
  {
    name: 'Create Zist',
    Icon: <IoMdCreate />,
    path: '/dashboard/create-zist',
  },
  // {
  //   name: 'Settings',
  //   Icon: <AiFillSetting />,
  //   path: '/dashboard/settings',
  // },
];
const Sidebar = () => {
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

  const containerClasses = cn(
    'min-w-[13rem]',
    'max-w-[15rem]',
    'w-full',
    'py-2',
    'bg-[#151718]',
    'rounded-2xl',
    'sticky',
    'overflow-hidden',
    'transition-all',
    'duration-300',
    { 'top-7': scrolledBelowThreshold, 'top-28': !scrolledBelowThreshold },
    'h-fit',
    'delay-100'
  );

  return (
    <div className={containerClasses}>
      {items.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={`flex items-center justify-start px-4 py-3 cursor-pointer transition-all duration-300 hover:bg-[#262525] `}
        >
          <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-[#303030]">
            {item.Icon}
          </div>
          <div className="text-white">{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
