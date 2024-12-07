'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';

function ProfileMenu() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  if (!session)
    return (
      <Button
        className="flex items-center w-fit gap-2 rounded-xl border-2 px-8 h-10 border-gray-200 text-white"
        variant="outline"
        onClick={() => {
          signIn('github', {
            callbackUrl: `${window.location.origin}/dashboard`,
            redirect: true,
          });
        }}
      >
        <Github size={20} />
        Connect GitHub
      </Button>
    );
  else
    return (
      <div className="flex items-center gap-5">
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
            <Link href="/dashboard">
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
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
      </div>
    );
}

export default ProfileMenu;
