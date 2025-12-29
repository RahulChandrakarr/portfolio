'use client'
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WorkExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const experiences = [
        {
            role: 'Software Engineer',
            company: 'NJ Design Park, Bhilai',
            period: 'July 2025 - Present',
            description: [
                'Driving development of a custom review management system using Supabase, Google Cloud, Apify, React.js, and Next.js',
                'Replacing costly third-party APIs with optimized in-house solutions',
                'Managing deployments via Google Cloud Console and utilizing Docker and Coolify for containerization',
                'Integrating Google APIs for enhanced functionality and seamless user experiences'
            ]
        },
        {
            role: 'Software Engineer',
            company: 'Sunns Technologies',
            period: 'May 2024 - July 2025',
            description: [
                'Built multiple full-stack applications with modern tech stack',
                'Developed MindMatch (personality test app), food delivery platform, and company portfolio sites',
                'Utilized React.js, Next.js, Node.js, Express.js, MongoDB, Parse Server, and modern animation libraries',
                'Delivered responsive interfaces with robust functionality and cross-platform support',
                'Consistently completed projects on time while exploring new technologies'
            ]
        },
        {
            role: 'Full Stack Web Developer',
            company: 'NJ Design Park',
            period: 'May 2023 - May 2024',
            description: [
                'Built and optimized dynamic websites using HTML, CSS, JavaScript, jQuery, and PHP',
                'Designed custom WordPress solutions with plugins, theme development, and SEO optimization',
                'Collaborated on end-to-end projects implementing responsive designs and modern technologies'
            ]
        }
    ];

    return (
        <section id='experience' className='py-20 bg-black relative overflow-hidden' ref={containerRef}>
            <div className='max-w-7xl mx-auto px-6 relative z-10'>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-3xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50'
                >
                    Work Experience
                </motion.h2>

                <div className='relative max-w-4xl mx-auto'>

                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 md:-translate-x-1/2"></div>

                    <div className='space-y-12'>
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Date Bubble - Mobile: Left, Desktop: Center */}
                                <div className="absolute left-[11px] md:left-1/2 top-0 w-5 h-5 rounded-full border-4 border-black bg-blue-500 z-20 md:-translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                                {/* Content Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
                                >
                                    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors duration-300 group">
                                        <div className="flex flex-col gap-2 mb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                                            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                                                <span className="font-semibold text-blue-200">{exp.company}</span>
                                                <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                                                <span className="font-mono text-xs border border-neutral-700 rounded px-2 py-0.5">{exp.period}</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                {/* Spacer for the other side on desktop */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
