import { HoverEffect } from "./ui/CartHoverEffect";

export function IntroCarts() {
  return (
    <div className="max-w-5xl w-full mx-auto ">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
    {
        "title": "FRONT-END DEVELOPER",
        "description": "A front-end developer skilled in technologies like HTML, CSS, JavaScript, and CSS frameworks, building user-friendly and responsive interfaces.",
        "link": "https://stripe.com"
      },
      
      {
        "title": "REACT DEVELOPER",
        "description": "As a React and Next.js developer, I specialize in building dynamic and efficient web applications. Leveraging the MERN stack (MongoDB, Express, React, Node.js), I create seamless, scalable, and user-friendly experiences for modern web platforms.",
        "link": "https://netflix.com"
      },
      
      {
        "title": "BACK-END DEVELOPER",
        "description": "As a back-end developer, I work with technologies like Node.js, Express, MongoDB, Parse Server, and Firebase to build robust, scalable, and secure server-side applications that power modern web and mobile platforms.",
        "link": "https://google.com"
      }
      ,
      {
        "title": "APP DEVELOPER",
        "description": "As an app developer, I create cross-platform mobile applications using Flutter, Firebase, and Parse Server. My focus is on building seamless, high-performance, and user-friendly apps for modern mobile platforms.",
        "link": "https://googgle.com"
      },
      {
        "title": "UI/UX DESIGNER",
        "description": "As a UI/UX Designer, I specialize in creating intuitive and visually appealing digital experiences. My expertise includes user research, wireframing, prototyping, and crafting responsive interfaces that enhance user satisfaction and engagement across web and mobile platforms.",
        "link": "https://examplsdfse.com"
      },
      {
        "title": "WORDPRESS AND SHOPIFY DEVELOPER",
        "description": "As a WordPress and Shopify Developer, I design and develop custom, responsive websites and eCommerce stores. I focus on optimizing performance, creating user-friendly interfaces, and integrating advanced features to enhance business growth and customer experience.",
        "link": "https://example.com"
      }
      
  
];
