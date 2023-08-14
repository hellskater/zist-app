'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function ProfileMenu() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={session?.user?.image || '/empty.png'}
          alt="profile image"
          width={50}
          height={50}
          className="rounded-full object-contain border-2 p-1 border-yellow-500 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20 -ml-20">
        <Link href="/dashboard/settings">
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer bg-red-500 bg-opacity-10 text-red-500 focus:bg-red-500 focus:bg-opacity-30"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
