'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { IntroCarts } from './IntroCarts'

export default function Introduction() {
    return (
        <section id='intro' className='relative py-20 bg-black'>
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className='flex flex-col gap-6 mb-12'
                >
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
                    >
                        About Me
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-6 text-neutral-300 text-lg leading-relaxed">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 0.8)", borderColor: "rgba(64, 64, 64, 1)" }}
                            className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 cursor-default transition-colors duration-300 flex flex-col"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Who I Am</h3>
                            <p>
                                I am an experienced <strong>Full Stack Developer</strong> from India with a passion for building robust, scalable web applications. My journey involves a deep dive into modern web architecture, where I specialize in the <strong>MERN stack</strong> and <strong>Next.js</strong> ecosystem.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 0.8)", borderColor: "rgba(64, 64, 64, 1)" }}
                            className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 cursor-default transition-colors duration-300 flex flex-col"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">What I Do</h3>
                            <p>
                                Currently, I serve as a Software Engineer at <strong>NJ Design Park</strong>, driving the development of enterprise-grade solutions. I thrive on solving complex problems—whether it's optimizing a review management system or containerizing applications with <strong>Docker</strong>.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 0.8)", borderColor: "rgba(64, 64, 64, 1)" }}
                            className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 cursor-default transition-colors duration-300 flex flex-col"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Growth & Education</h3>
                            <div className="space-y-6">
                                <p>
                                    Beyond standard development, I am actively exploring the intersection of <strong>AI/ML</strong> and web technologies, continuously learning tools like <strong>Google Cloud Platform</strong> to build smarter solutions.
                                </p>
                                <div className="pt-4 border-t border-neutral-800">
                                    <h4 className="text-lg font-medium text-white mb-2">Education</h4>
                                    <p className="text-neutral-400 text-base">
                                        Currently pursuing <strong>MCA</strong>
                                    </p>
                                    <p className="text-neutral-500 text-sm">
                                        BCA Graduate • 7.5 GPA
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="boxes">
                        <IntroCarts />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
