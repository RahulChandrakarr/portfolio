"use client";
import React, { MouseEvent } from "react";
import { useAnimate } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiShopify,
  SiWordpress,
  SiFigma,
  SiCanva,

} from "react-icons/si";
import { IconType } from "react-icons";

export const Technologies = () => {
  return (
    <div id="tech" className="bg-black py-40 md:h-screen ">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-white font-semibold text-4xl my-8">
          TECHNOLOGIES I USE
        </h3>
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <div className="grid grid-cols-5 divide-x divide-neutral-900">
        <LinkBox Icon={SiHtml5} href="https://developer.mozilla.org/en-US/docs/Web/HTML" />
        <LinkBox Icon={SiCss3} href="https://developer.mozilla.org/en-US/docs/Web/CSS" />
        <LinkBox Icon={SiJavascript} href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
        <LinkBox Icon={SiBootstrap} href="https://getbootstrap.com/docs/" />
        <LinkBox Icon={SiReact} href="https://react.dev/" />
      </div>
      <div className="grid grid-cols-6 divide-x divide-neutral-900">
        <LinkBox Icon={SiNextdotjs} href="https://nextjs.org/docs" />
        <LinkBox Icon={SiTailwindcss} href="https://tailwindcss.com/docs" />
        <LinkBox Icon={SiNodedotjs} href="https://nodejs.org/en/docs" />
        <LinkBox Icon={SiExpress} href="https://expressjs.com/" />
        <LinkBox Icon={SiMongodb} href="https://www.mongodb.com/docs/" />
        <LinkBox Icon={SiFirebase} href="https://firebase.google.com/docs" />
      </div>
      <div className="grid grid-cols-5 divide-x divide-neutral-900">
        <LinkBox Icon={SiShopify} href="https://shopify.dev/docs" />
        <LinkBox Icon={SiWordpress} href="https://wordpress.org/support/article/wordpress-lessons/" />
        <LinkBox Icon={SiFigma} href="https://help.figma.com/hc/en-us" />
        <LinkBox Icon={SiCanva} href="https://www.canva.com/help/" />
      </div>

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
    <a
      href={href}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};

// Custom placeholder icons for Spline and Canva
const CustomIcon = () => <span className="text-white text-xl">Spline</span>;
const AnotherCustomIcon = () => <span className="text-white text-xl">Canva</span>;
