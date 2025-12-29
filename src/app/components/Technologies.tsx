"use client";
import React, { MouseEvent } from "react";
import { useAnimate, motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiBootstrap,
  SiTailwindcss,
  SiRedux,
  SiJquery,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiFigma,
  SiGooglecloud,
  SiNpm,
  SiYarn
} from "react-icons/si";
import { IconType } from "react-icons";

export const Technologies = () => {
  return (
    <div id="tech" className="bg-black py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-white font-semibold text-4xl my-8"
        >
          TECHNICAL SKILLS
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ClipPathLinks />
        </motion.div>
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-neutral-900"
      >
        <LinkBox Icon={SiHtml5} href="#" />
        <LinkBox Icon={SiCss3} href="#" />
        <LinkBox Icon={SiJavascript} href="#" />
        <LinkBox Icon={SiTypescript} href="#" />
        <LinkBox Icon={SiReact} href="#" />
        <LinkBox Icon={SiNextdotjs} href="#" />
        <LinkBox Icon={SiBootstrap} href="#" />
        <LinkBox Icon={SiTailwindcss} href="#" />
        <LinkBox Icon={SiRedux} href="#" />
        <LinkBox Icon={SiJquery} href="#" />
        <LinkBox Icon={SiNodedotjs} href="#" />
        <LinkBox Icon={SiExpress} href="#" />
        <LinkBox Icon={SiMongodb} href="#" />
        <LinkBox Icon={SiPostgresql} href="#" />
        <LinkBox Icon={SiMysql} href="#" />
        <LinkBox Icon={SiFirebase} href="#" />
        <LinkBox Icon={SiSupabase} href="#" />
        <LinkBox Icon={SiGit} href="#" />
        <LinkBox Icon={SiGithub} href="#" />
        <LinkBox Icon={SiDocker} href="#" />
        <LinkBox Icon={SiPostman} href="#" />
        <LinkBox Icon={SiFigma} href="#" />
        <LinkBox Icon={SiGooglecloud} href="#" />
        <LinkBox Icon={SiNpm} href="#" />
        <LinkBox Icon={SiYarn} href="#" />
      </motion.div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "top" | "left" | "bottom" | "right";
type KeyframeMap = {
  [key in Side]: string[];
};

const ENTRANCE_KEYFRAMES: KeyframeMap = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: KeyframeMap = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }: { Icon: IconType; href: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: MouseEvent) => {
    const box = (e.target as HTMLElement).getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as Side,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as Side,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as Side,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as Side,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: MouseEvent) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <motion.a
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
      }}
      href={href}
      onMouseEnter={(e: any) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e: any) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl text-neutral-500" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </motion.a>
  );
};