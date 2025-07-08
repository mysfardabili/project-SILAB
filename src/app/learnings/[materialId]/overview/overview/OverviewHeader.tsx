'use client';

import { BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const OverviewHeader = () => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 p-8 shadow-lg'>
      <div className='flex flex-col lg:flex-row justify-between gap-8 items-center'>
        <div className="lg:w-1/2 flex flex-col text-white">
          <span className='flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 w-fit'>
            <BookOpen className='w-4 h-4' />
            <span className='text-sm font-medium'>Course</span>
          </span>

          <h1 className='font-bold text-3xl md:text-4xl mt-4 leading-tight'>
            How to become a good backend developer
          </h1>

          <p className='mt-4 text-white/90 leading-relaxed'>
            Master server-side architecture, databases, and API design with industry-standard tools and best practices.
          </p>

          <div className='mt-6 flex flex-wrap gap-2'>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Node.js</Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Database Design</Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">API Development</Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">System Architecture</Badge>
          </div>

          <div className='flex gap-3 mt-8'>
            <Button className='bg-white text-indigo-700 hover:bg-white/90 transition-colors font-medium flex items-center gap-2'>
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="lg:w-2/5">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <Image
              className="rounded-lg w-full"
              src="/vignettes/code-placeholder.svg"
              alt="Backend development illustration"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeader;
