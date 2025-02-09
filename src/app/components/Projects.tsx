import React from 'react';
import ProjectCart from './ProjectCart';

export default function Projects() {
  const projectsData = [
    {
      image: '/project1.jpg',
      heading: 'Project One',
      description: 'This is the first project description.',
      link: 'https://example.com/project1',
    },
    {
      image: '/project2.jpg',
      heading: 'Project Two',
      description: 'This is the second project description.',
      link: 'https://example.com/project2',
    },
    {
      image: '/project3.jpg',
      heading: 'Project Three',
      description: 'This is the third project description.',
      link: 'https://example.com/project3',
    },
    {
      image: '/project4.jpg',
      heading: 'Project Four',
      description: 'This is the fourth project description.',
      link: 'https://example.com/project4',
    },
  ];

  return (
    <div className="relative flex flex-col gap-4 min-h-screen py-40 md:py-0">
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
