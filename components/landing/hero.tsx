'use client';

import { Balancer } from 'react-wrap-balancer';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useIsMobile } from '@/lib/hooks/useIsMobile';

import { Button } from '../ui/button';

import { HeroZistCard } from './hero-gist-card';

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section className="min-h-screen lg:min-h-0 w-full">
      <div className="flex h-screen justify-center items-center w-full lg:w-2/3 mx-auto">
        <div className="flex w-1/2 flex-col gap-10">
          <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
            <Image
              src="/logo.png"
              alt="Zist Logo"
              width={200}
              height={200}
              className="object-contain"
            />
            <h1 className="bg-gradient-to-r from-orange-500 bg-clip-text text-6xl font-extrabold text-transparent to-white sm:text-8xl sm:leading-[5.5rem]">
              zist
            </h1>
          </div>
          <p className="max-w-[55ch] bg-transparent px-8 text-center font-medium leading-8 text-gray-300 lg:px-0 lg:text-left">
            <Balancer>
              Optimize your coding workflow with Zist. Save, organize, and
              access your code snippets effortlessly. Zist syncs with your
              GitHub gists, making your snippets available directly in VS Code
              and your browser. Turn coding chaos into clarity with Zist.
            </Balancer>
          </p>

          <Button
            className="flex items-center w-fit gap-2 rounded-xl border-2 px-8 h-10 border-gray-200 text-white"
            variant="outline"
          >
            Get Started
          </Button>
        </div>

        {!isMobile && (
          <div className="relative w-1/2 hidden h-[800px] overflow-visible lg:block">
            <motion.div
              animate={{
                y: 140,
                opacity: 1,
                transition: {
                  duration: 0.4,
                },
              }}
              initial={{
                y: 150,
                x: 180,
                opacity: 0,
              }}
            >
              <HeroZistCard />
            </motion.div>
            <motion.div
              animate={{
                y: -140,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  delay: 0.1,
                },
              }}
              initial={{
                opacity: 0,
                y: -130,
                x: 80,
              }}
            >
              <HeroZistCard />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
export default Hero;
