import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ContentNotFoundProps = {
  header: string;
  showImage: boolean;
  imageURL: string;
  message: string;
  showButton: boolean;
  buttonText: string;
  redirectURL: string;
};
const ContentNotFound = ({
  header,
  showImage,
  imageURL,
  message,
  showButton,
  buttonText,
  redirectURL,
}: ContentNotFoundProps) => {
  return (
    <div className="min-h-screen pt-28 pb-10 md:pt-0 md:pb-0 text-white w-full flex justify-center items-center flex-col">
      <h1 className="text-xl md:text-xl font-bold tracking-widest font-mono">
        {header}
      </h1>
      {showImage && (
        <Image
          src={imageURL}
          width="400"
          height="400"
          alt="404"
          className="object-contain mt-10"
        />
      )}
      <p className="text-xl text-center mt-10 italic">{message}</p>
      {showButton && (
        <Link
          className="text-xl font-semibold mt-10 cursor-pointer px-8 py-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-400"
          href={redirectURL}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};
export default ContentNotFound;
