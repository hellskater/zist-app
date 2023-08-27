'use client';

import { useGetDbUser } from '@/lib/hooks/useDbuser';

const AutotagCount = () => {
  const { data: dbUser } = useGetDbUser();

  const remainingCredits = dbUser?.maxallowed
    ? dbUser?.maxallowed - dbUser?.autotagcount
    : 0;

  const getTextColor = () => {
    if (remainingCredits > 0) {
      return 'text-green-500 font-semibold';
    } else {
      return 'text-red-500 font-semibold';
    }
  };

  return (
    <div className="px-4 py-1 text-sm bg-stone-800 text-white rounded-md">
      <p>
        Credits: <span className={getTextColor()}>{remainingCredits}</span>
      </p>
    </div>
  );
};

export default AutotagCount;
