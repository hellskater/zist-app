'use client';

import { Balancer } from 'react-wrap-balancer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { GithubIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { HeroZistCard } from './hero-gist-card';

function Hero() {
  return (
    <section className="min-h-screen lg:min-h-0 w-full">
      <div className="flex h-screen justify-center items-center w-full lg:w-2/3 mx-auto">
        <div className="flex lg:w-1/2 flex-col gap-10">
          <div className="flex w-full items-center gap-4 pl-4 lg:pl-0">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32">
              <Image
                src="/logo.png"
                alt="Zist Logo"
                fill
                className="object-contain w-full h-full"
              />
            </div>

            <h1 className="bg-gradient-to-r from-orange-500 bg-clip-text text-8xl font-extrabold text-transparent to-white">
              zist
            </h1>
          </div>
          <p className="lg:max-w-[55ch] w-full bg-transparent px-8 text-sm lg:text-lg font-medium leading-6 lg:leading-8 text-gray-300 lg:px-0">
            <Balancer>
              Optimize your coding workflow with Zist. Save, organize, and
              access your code snippets effortlessly. Zist syncs with your
              GitHub gists, making your snippets available directly in VS Code
              and your browser. Turn coding chaos into clarity with Zist.
            </Balancer>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
            <Button
              className="flex ml-8 lg:ml-0 items-center w-fit gap-2 rounded-xl border-2 px-8 h-10 border-gray-200 text-white"
              variant="outline"
              onClick={() => {
                signIn('github', {
                  callbackUrl: `${window.location.origin}/dashboard`,
                  redirect: true,
                });
              }}
            >
              Get Started
            </Button>
            <a
              href="https://github.com/hellskater/zist-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="flex ml-8 lg:ml-0 items-center w-fit gap-2 rounded-xl border-2 px-6 h-10 border-stone-800 text-white"
                variant="outline"
              >
                <GithubIcon className="w-5 h-5" />
                <p>Contribute</p>
              </Button>
            </a>
          </div>
        </div>

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
      </div>
    </section>
  );
}
export default Hero;
