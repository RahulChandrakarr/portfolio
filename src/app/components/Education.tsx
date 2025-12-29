'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            id='education'
            className='py-20 text-white max-w-7xl mx-auto'
        >
            <h2 className='text-4xl font-serif font-semibold mb-12'> Education & Certifications</h2>

            <div className='grid md:grid-cols-2 gap-10'>
                {/* Education Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h3 className='text-2xl font-bold mb-6 text-gray-200'>Education</h3>
                    <div className='space-y-8'>
                        <div className='bg-neutral-900 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors'>
                            <h4 className='text-xl font-bold text-white'>Master of Computer Application</h4>
                            <p className='text-blue-400 font-medium'>Shree Shankaracharya Professional University, Bhilai</p>
                            <p className='text-gray-400 text-sm mt-1'>2025-2027</p>
                            <p className='text-gray-300 mt-3 text-sm'>
                                Focus: Advanced Programming, AI/ML Foundations, Software Engineering, Distributed Systems
                            </p>
                        </div>

                        <div className='bg-neutral-900 p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors'>
                            <h4 className='text-xl font-bold text-white'>Bachelor of Computer Application</h4>
                            <p className='text-blue-400 font-medium'>GD Rungta College of Science & Technology, Bhilai</p>
                            <p className='text-gray-400 text-sm mt-1'>2021-2024</p>
                            <p className='text-gray-300 mt-2 font-semibold'>7.5 GPA</p>
                        </div>
                    </div>
                </motion.div>

                {/* Certifications Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <h3 className='text-2xl font-bold mb-6 text-gray-200'>Certifications</h3>
                    <div className='space-y-4'>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className='flex items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors'
                        >
                            <div className='text-2xl'>✅</div>
                            <div>
                                <h4 className='text-lg font-bold text-white'>Full Stack Web Development</h4>
                                <p className='text-gray-400 text-sm'>Apna College</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className='flex items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors'
                        >
                            <div className='text-2xl'>✅</div>
                            <div>
                                <h4 className='text-lg font-bold text-white'>Flutter Development with Firebase</h4>
                                <p className='text-gray-400 text-sm'>Completed Course</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
