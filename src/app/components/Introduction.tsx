'use client'
import React from 'react'
import { IntroCarts } from './IntroCarts'

export default function Introduction() {
    return (
        <div className='relative'>
            <div className='headings flex flex-col gap-2'>
                <h1 className='text-4xl font-semibold font-serif'>Introduction</h1>
                <h2 className='text-2xl'>Overview</h2>
                <p className='text-justify'>
                    I&#39;m a skilled Full Stack software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Node.js, MongoDB, and Express.js. I&#39;m a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let&#39;s work together to bring your ideas to life!
                </p>
            </div>
            <div>
                <div className="boxes">
                    <IntroCarts />
                </div>
            </div>
        </div>
    )
}
