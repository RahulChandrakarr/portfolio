'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState<{
    email: string;
    subject: string;
    message: string;
  }>({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, subject, message } = formData;
    const mailtoLink = `mailto:rrahulchandrakar1@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id='contact' className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="p-4 max-w-7xl mx-auto w-full pt-20 md:pt-0 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Let's Connect
            </h2>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-lg leading-relaxed">
              Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="pt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Find me on</h3>
              <SocialIcons flex={"row"} position={"relative"} />
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 w-full bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition-all resize-none"
                  placeholder="Leave a comment..."
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 px-6 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                Send Message
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
