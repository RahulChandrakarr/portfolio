"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ThreeDCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProjectCartProps {
    image: string;
    heading: string;
    description: string;
    link: string;
    techStack?: string;
}

export function ThreeDProjectCard({ image, heading, description, link, techStack }: ProjectCartProps) {
    return (
        <CardContainer className="inter-var w-full">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-[550px] rounded-xl p-6 border flex flex-col">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {heading}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
                >
                    {description}
                </CardItem>

                <CardItem translateZ="100" className="w-full mt-4 flex-grow relative">
                    <div className="w-full h-full rounded-xl group-hover/card:shadow-xl overflow-hidden relative">
                        <iframe
                            src={link}
                            title={heading}
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                            loading="lazy"
                            scrolling="no"
                        />
                        <div
                            style={{
                                background:
                                    'linear-gradient(123.9deg, #0B65ED 1.52%, rgba(0, 0, 0, 0) 68.91%)',
                            }}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 opacity-0 group-hover:opacity-20 transition-all duration-300"
                        ></div>
                    </div>
                </CardItem>

                <div className="flex justify-between items-center mt-6">
                    {techStack && (
                        <CardItem
                            translateZ={20}
                            className="text-xs font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded"
                        >
                            {techStack.split(',')[0]}...
                        </CardItem>
                    )}

                    <CardItem
                        translateZ={20}
                        as={Link}
                        href={link}
                        target="__blank"
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Visit <ChevronRight size={12} />
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
