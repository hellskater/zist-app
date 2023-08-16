'use client';

import Image from 'next/image';
import { BsCodeSquare } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';

import { Skeleton } from '@/components/ui/skeleton';
import { useGithubProfile } from '@/lib/hooks/useGithubProfile';
import { User } from '@/lib/types/gist';

type Props = {
  username?: string;
  userData?: User;
  isGistLoading?: boolean;
};

export default function UserProfile({
  username,
  userData,
  isGistLoading,
}: Props) {
  const { data, isLoading: isProfileLoading } = useGithubProfile(username);

  const isLoading = username ? isProfileLoading : isGistLoading;

  if (!userData && !isLoading && !data) {
    return (
      <div className="w-full min-w-[13rem] text-white p-4">
        <p>User not found</p>
      </div>
    );
  }

  const user = userData || data;

  return (
    <div className="w-full min-w-[13rem] text-white p-4 sticky top-28">
      <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md">
        <div className="relative h-40 w-40">
          {isLoading ? (
            <Skeleton className="rounded-full h-full w-full object-contain" />
          ) : (
            <Image
              src={user.avatar_url}
              alt={user.name}
              layout="fill"
              className="rounded-full object-contain"
            />
          )}
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-gray-400">@{user.login}</p>
              <p className="mt-4 text-sm">{user.bio}</p>
              <div className="mt-4 flex items-center text-sm space-x-2">
                <FiUsers className="text-xl text-white" />
                <span className="text-gray-400">
                  {user.followers} follower{user.followers > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-4 flex items-center text-sm space-x-2">
                <BsCodeSquare className="text-xl text-white" />
                <span className="text-gray-400">
                  {user.public_gists} gist{user.public_gists > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-4">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
