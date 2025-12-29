import React from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Define props interface
interface ProjectCartProps {
  image: string;
  heading: string;
  description: string;
  link: string;
  techStack?: string;
}

const ProjectCart: React.FC<ProjectCartProps> = ({ heading, description, link, techStack, image }) => {
  return (
    <div className="h-[550px] w-full group mx-auto dark:bg-[#252525] p-2 bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black flex flex-col">
      <figure className="w-full h-64 flex-shrink-0 group-hover:h-60 transition-all duration-300 dark:bg-[#0a121a] bg-[#f0f5fa] p-2 rounded-md relative overflow-hidden">
        <div
          style={{
            background:
              'linear-gradient(123.9deg, #0B65ED 1.52%, rgba(0, 0, 0, 0) 68.91%)',
          }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 group-hover:opacity-100 opacity-0 transition-all duration-300"
        ></div>

        {/* Iframe for Live Preview */}
        <Image
          src={image}
          alt={heading}
          fill
          className="object-cover rounded-lg"
        />
      </figure>
      <article className="p-4 flex flex-col flex-grow">
        <h1 className="text-xl font-semibold capitalize mb-2">{heading}</h1>
        <p className="text-sm leading-[140%] text-gray-600 dark:text-gray-300 mb-3 flex-grow">{description}</p>

        {techStack && (
          <div className="mb-3 text-xs text-blue-500 font-mono bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            {techStack}
          </div>
        )}

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base dark:text-white text-blue-600 font-normal flex gap-1 items-center hover:underline mt-auto"
        >
          View Live Demo
          <span>
            <ChevronRight size={16} />
          </span>
        </a>
      </article>
    </div>
  );
};

export default ProjectCart;
