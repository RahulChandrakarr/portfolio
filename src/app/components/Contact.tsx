'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
    const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id='contact' className="">
      <div className="h-screen px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-semibold">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light  sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center border  text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
          </div>
          <div>

          <SocialIcons flex={"row"} position={"relative"}/>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
}
