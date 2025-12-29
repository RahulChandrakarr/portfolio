'use client'
import React from 'react';
import { ThreeDProjectCard } from './ui/ThreeDProjectCard';

export default function Projects() {
  const projectsData = [
    {
      image: '/images/sunnstech-project.png',
      heading: 'Sunns Technologies',
      description: 'Software Company Website. Corporate website for a software development company. Built with Next.js for high performance and SEO optimization.',
      link: 'https://sunnstech.com/',
      techStack: 'Next.js, Tailwind CSS, Framer Motion'
    },
    {
      image: '/images/picsafe.png',
      heading: 'PicSafe',
      description: 'Image Copyright Detection Platform. SaaS platform for copyright protection using Next.js and Supabase. Features Google Vision API integration for reverse image search and real-time copyright risk analysis.',
      link: 'https://picsafe.app/',
      techStack: 'Next.js, Supabase, Google Vision API, Tailwind CSS'
    },
    {
      image: '/images/auditly360.png',
      heading: 'Auditly360',
      description: 'Web Auditing Platform. Full-cycle automated website auditing with OpenAI and Gemini integration. Rust web-spider for comprehensive site analysis.',
      link: 'http://auditly360.com/',
      techStack: 'MERN, Next.js, Supabase, OpenAI, Rust'
    },
    {
      image: '/images/reviews.png',
      heading: 'Review Management System',
      description: 'Custom Review Solution. Custom review collection and display solution with Apify Review Scraper. Embeddable widget for seamless website integration.',
      link: 'https://reviews.webuildtrades.com/',
      techStack: 'Next.js, Supabase, Apify, React'
    },
    {
      image: '/images/ai-trades.png',
      heading: 'AI for Trades',
      description: 'AI-Powered Trade Platform. AI-powered platform for trade professionals with advanced AI integration, modern authentication, and user management.',
      link: 'https://www.aifortrades.co.uk/sign-in',
      techStack: 'Next.js, AI Integration, Authentication'
    },
    {
      image: '/images/bhagwati.png',
      heading: 'Bhagwati Oil',
      description: 'Corporate Website. Professional business portfolio with responsive design, optimized performance, and SEO. Modern corporate presence.',
      link: 'https://bhagwati-oil.vercel.app/',
      techStack: 'Next.js, Tailwind CSS, Framer Motion'
    },
    {
      image: '/images/ska.png',
      heading: 'SKA Construction',
      description: 'Construction Portfolio. Modern construction business website with project showcase, service presentation, and responsive design.',
      link: 'https://ska-teal.vercel.app/',
      techStack: 'Next.js, React, Tailwind CSS, GSAP'
    },
    {
      image: '/images/portfolio.png',
      heading: 'My Portfolio',
      description: 'Personal Developer Portfolio. Showcasing projects and professional experience with interactive UI, modern animations, and comprehensive project documentation.',
      link: 'https://portfolio-amc-team01.vercel.app/',
      techStack: 'React.js, Framer Motion, Tailwind CSS'
    }
  ];

  return (
    <div id='projects' className="relative flex flex-col gap-4 min-h-screen py-20 bg-black">
      <div className="headings mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Featured Projects</h2>
        <p className="mt-4 text-neutral-400">Interact with the cards to view details</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 mt-10">
        {projectsData.map((project, index) => (
          <div key={index} className="w-full h-auto">
            <ThreeDProjectCard
              image={project.image}
              heading={project.heading}
              description={project.description}
              link={project.link}
              techStack={project.techStack}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
