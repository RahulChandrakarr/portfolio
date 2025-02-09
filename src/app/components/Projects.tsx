import React from 'react';
import ProjectCart from './ProjectCart';

export default function Projects() {
  const projectsData = [
    {
      image: '/images/mind-match.png',
      heading: 'Mind Match',
      description: 'This survey is a Do It Yourself (DIY) assessment helping to understand how you could be seen by others based on your contextual behaviour patterns.',
      link: 'https://mindmatch.co.in/home',
    },
    {
      image: '/images/sunnstech.png',
      heading: 'Sunnstech',
      description: 'Software company in Chhattisgarh',
      link: 'https://sunnstech.com/',
    },
   
  ];

  return (
    <div id='projects' className="relative flex flex-col gap-4 min-h-screen py-40 ">
      <div className="headings mb-4">
        <h2 className="text-4xl font-serif font-semibold">Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {projectsData.map((project, index) => (
          <ProjectCart
            key={index}
            image={project.image}
            heading={project.heading}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
