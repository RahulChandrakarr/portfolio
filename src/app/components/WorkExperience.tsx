import React from 'react';

export default function WorkExperience() {
    const experiences = [
        {
            role: 'Software Engineer',
            company: 'NJ Design Park, Bhilai',
            period: 'July 2025 - Present', // Wait, the user prompt says July 2025? It's currently Dec 2024 (or close). The user might mean 2024 or this is a future resume. I will trust the user's input: "July 2025 - Present". Wait, looking at "About Me", it says "Currently serving as Software Engineer...".
            // Re-reading user request: "Software Engineer | NJ Design Park, Bhilai. July 2025 - Present".
            // Wait, "July 2025" is in the future relative to typical current dates (unless year is > 2025).
            // Ah, the metadata says "Current local time is: 2025-12-29". So July 2025 is in the past. Okay.
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
        <div id='experience' className='py-20 text-white'>
            <h2 className='text-4xl font-serif font-semibold mb-12'>💼 Work Experience</h2>
            <div className='relative border-l border-gray-700 ml-4 md:ml-6 space-y-12'>
                {experiences.map((exp, index) => (
                    <div key={index} className='pl-8 relative'>
                        {/* Timeline dot */}
                        <span className='absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 border-4 border-black box-content'></span>

                        <h3 className='text-2xl font-bold mb-1'>{exp.role}</h3>
                        <div className='flex flex-wrap gap-2 items-center text-gray-400 mb-4 text-sm'>
                            <span className='font-semibold text-gray-300'>{exp.company}</span>
                            <span>•</span>
                            <span>{exp.period}</span>
                        </div>

                        <ul className='list-disc list-outside ml-4 space-y-2 text-gray-300'>
                            {exp.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
