'use client'
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export const Welcome = () => {
  const products = [
    {
      title: "Sunns Technologies",
      link: "https://sunnstech.com/",
      thumbnail: "/images/sunnstech-project.png",
    },
    {
      title: "PicSafe",
      link: "https://picsafe.app/",
      thumbnail: "/images/picsafe.png",
    },
    {
      title: "Auditly360",
      link: "http://auditly360.com/",
      thumbnail: "/images/auditly360.png",
    },
    {
      title: "Review Management System",
      link: "https://reviews.webuildtrades.com/",
      thumbnail: "/images/reviews.png",
    },
    {
      title: "AI for Trades",
      link: "https://www.aifortrades.co.uk/sign-in",
      thumbnail: "/images/ai-trades.png",
    },
    {
      title: "Bhagwati Oil",
      link: "https://bhagwati-oil.vercel.app/",
      thumbnail: "/images/bhagwati.png",
    },
    {
      title: "SKA Construction",
      link: "https://ska-teal.vercel.app/",
      thumbnail: "/images/ska.png",
    },
    {
      title: "My Portfolio",
      link: "https://portfolio-amc-team01.vercel.app/",
      thumbnail: "/images/portfolio.png",
    },
    {
      title: "Sunns Technologies",
      link: "https://sunnstech.com/",
      thumbnail: "/images/sunnstech-project.png", // Reuse
    },
    {
      title: "PicSafe",
      link: "https://picsafe.app/",
      thumbnail: "/images/picsafe.png", // Reuse
    },
    {
      title: "Auditly360",
      link: "http://auditly360.com/",
      thumbnail: "/images/auditly360.png", // Reuse
    },
    {
      title: "Review Management System",
      link: "https://reviews.webuildtrades.com/",
      thumbnail: "/images/reviews.png", // Reuse
    },
    {
      title: "AI for Trades",
      link: "https://www.aifortrades.co.uk/sign-in",
      thumbnail: "/images/ai-trades.png", // Reuse
    },
    {
      title: "Bhagwati Oil",
      link: "https://bhagwati-oil.vercel.app/",
      thumbnail: "/images/bhagwati.png", // Reuse
    },
    {
      title: "SKA Construction",
      link: "https://ska-teal.vercel.app/",
      thumbnail: "/images/ska.png", // Reuse
    },
  ];
      // Note: Some products are repeated to enhance the parallax effect
  return <HeroParallax products={products} />;
};