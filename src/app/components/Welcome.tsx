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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="flex flex-col gap-4 justify-center items-center"
        >

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Hi <motion.span
                className="inline-block"
                whileHover={{ rotate: 20, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >👋</motion.span>, I&apos;m <br /> Rahul Kumar
            </h1>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
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
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-col md:flex-row gap-4 mt-8 items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(38, 38, 38, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition duration-200"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } }
            }}
            className="mt-10"
          >
            <SocialIcons flex="row" position="relative" />
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};