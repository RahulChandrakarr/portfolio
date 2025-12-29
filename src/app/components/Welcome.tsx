'use client'
import React from "react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { Spotlight } from "./ui/Spotlight";

export const Welcome = () => {
  return (
    <section id="Home" className="h-[40rem] md:h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <div className="flex flex-col gap-4 justify-center items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Hi <span className="inline-block hover:rotate-12 transition-transform duration-300">👋</span>, I&apos;m <br /> Rahul Kumar
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto"
          >
            <p className="mb-4 text-lg md:text-xl text-blue-200 font-semibold">
              Full Stack Developer | MERN Stack Specialist
            </p>
            <p className="text-neutral-400">
              Building scalable, enterprise-grade web solutions. Currently specializing in Next.js, Cloud Architectures, and delivering premium user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 mt-8 items-center"
          >
            <a href="#projects" className="px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition duration-200">
              Contact Me
            </a>
          </motion.div>

          <div className="mt-10">
            <SocialIcons flex="row" position="relative" />
          </div>

        </div>
      </div>

    </section>
  );
};