import { FaCode } from 'react-icons/fa';
import { VscFiles } from 'react-icons/vsc';
import { FaWandMagicSparkles } from 'react-icons/fa6';

import CodePreview from '../preview/code-preview';

const gistContent = `
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient } from "@tanstack/react-query";
`;

export function HeroZistCard() {
  return (
    <div className="group/card flex w-96 flex-col gap-3 rounded-2xl border p-7 duration-300 hover:-skew-x-3 hover:scale-105 hover:shadow-[2rem_2rem_2rem_-1rem_#0004,inset_1rem_1rem_4rem_-1rem_#fff1] border-zinc-800 bg-zinc-900 drop-shadow-[0_0_15px_rgba(49,49,49,0.35)]">
      <section>
        <CodePreview value={gistContent} language="typescript" />
      </section>
      <section className="p-5">
        <div className="flex items-center gap-5 justify-between">
          <p className="text-base">authOptions.tsx</p>
          <FaCode className="text-3xl text-white" />
        </div>
      </section>

      <section className="px-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`bg-zinc-800 text-white px-3 py-1 rounded-md text-sm`}
            >
              React
            </span>
            <span
              className={`bg-zinc-800 text-white px-3 py-1 rounded-md text-sm`}
            >
              Typescript
            </span>
          </div>
        </div>
      </section>
      <section className="px-5 mt-5 flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-400">
          2
          <VscFiles />
          <p className="text-sm ml-2">2 min ago</p>
        </div>

        <div className="flex items-center text-sm gap-2 bg-zinc-800 text-yellow-500 cursor-pointer py-1 px-3 transition-all duration-300 rounded-md">
          <FaWandMagicSparkles className="text-xl transition-all duration-100 animate-spin" />
          <p>Auto Tag</p>
        </div>
      </section>

      <section className="px-5 mt-3 text-sm text-gray-400">
        <p>This is a sample description.</p>
      </section>
    </div>
  );
}
