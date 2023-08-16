'use client';

import Image from 'next/image';
import { BsCodeSquare } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';

import { Skeleton } from '@/components/ui/skeleton';
import { useGithubProfile } from '@/lib/hooks/useGithubProfile';

export default function UserProfile({ username }: { username: string }) {
  const { data, isLoading } = useGithubProfile(username);

  if (!isLoading && !data) {
    return (
      <div className="w-full min-w-[13rem] text-white p-4">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-[13rem] text-white p-4">
      <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md">
        <div className="relative h-40 w-40">
          {isLoading ? (
            <Skeleton className="rounded-full h-full w-full object-contain" />
          ) : (
            <Image
              src={data.avatar_url}
              alt={data.name}
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
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-sm text-gray-400">@{data.login}</p>
              <p className="mt-4 text-sm">{data.bio}</p>
              <div className="mt-4 flex items-center text-sm space-x-2">
                <FiUsers className="text-xl text-white" />
                <span className="text-gray-400">
                  {data.followers} follower{data.followers > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-4 flex items-center text-sm space-x-2">
                <BsCodeSquare className="text-xl text-white" />
                <span className="text-gray-400">
                  {data.public_gists} gist{data.public_gists > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-4">
                <a
                  href={data.html_url}
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
