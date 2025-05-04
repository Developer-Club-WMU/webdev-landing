"use client";

import type { SocialInformation } from "@/models";
import { DEPARTMENTS } from "@/models";
import { useState } from "react";
import { FaDiscord, FaLinkedin, FaInstagram } from "react-icons/fa";

const GOOGLE_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyZ9-JLkEmfcH2N8ucdX_LSh0ZgtHqEp1AlO5YBLgCdi8f-hMgLj8HF-Jkq8TJ6j-lX1A/exec";

const fieldStyles = {
    name: {
        bg: "bg-bg dark:bg-bg-inverted",
        border: "border-text dark:border-text-inverted",
        ring: "",
    },

    email: {
        bg: "bg-bg dark:bg-bg-inverted",
        border: "border-text dark:border-text-inverted",
        ring: "focus:ring-ai",
    },

    department: {
        bg: "bg-bg dark:bg-bg-inverted",
        border: "border-text dark:border-text-inverted",
        ring: "focus:ring-app",
    },

    message: {
        bg: "bg-bg dark:bg-bg-inverted",
        border: "border-text dark:border-text-inverted",
        ring: "focus:ring-app",
    },
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: DEPARTMENTS[0] ?? "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitted:", formData);
        const params = new URLSearchParams(formData);

        await fetch(GOOGLE_FORM_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        setSubmitted(true);
    };

    const SOCIAL_LINKS: SocialInformation[] = [
        {
            name: "Discord",
            href: "https://discord.com/invite/q9gk2MasBC",
            icon: FaDiscord,
        },

        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/developer-club-wmu/",
            icon: FaLinkedin,
        },

        {
            name: "Instagram",
            href: "https://www.instagram.com/developerclubwmu",
            icon: FaInstagram,
        },
    ];

    return (
        <div className="info-page">
            <div className="text-text dark:text-text-inverted flex flex-col items-center gap-3 text-4xl font-black md:text-6xl lg:text-7xl xl:text-8xl">
                <h1 className="title mb-10">
                    <span>Contact </span>
                    <span
                        className="text-bright-yellow inline-block bg-gradient-to-r bg-clip-text"
                        style={{ fontWeight: "bold" }}
                    >
                        Us
                    </span>
                </h1>
            </div>

            <div className="text-text dark:text-text-inverted flex flex-col items-center px-4 sm:px-6 md:px-10">
                <h2 className="max-w-md text-2xl font-bold [letter-spacing:-.05em] md:text-3xl lg:max-w-2xl lg:text-5xl">
                    📬 Reach Out
                </h2>

                <p className="mt-5 mb-10 text-base leading-relaxed opacity-90 sm:text-lg md:text-xl lg:max-w-[600px]">
                    Interested in joining the club, have a question, an idea, or want to
                    collaborate — or even just want to drop a hi? Let us know what you&apos;re
                    thinking, and we&apos;ll make sure it reaches the right team.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-base font-medium text-text dark:text-text-inverted">
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`rounded-lg border ${fieldStyles.name.border} ${fieldStyles.name.bg} text-text dark:text-text-inverted p-3 ${fieldStyles.name.ring}`}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="example@test.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`text-black rounded-lg border ${fieldStyles.email.border} ${fieldStyles.email.bg} text-text dark:text-text-inverted p-3 ${fieldStyles.email.ring}`}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="department" className="text-base font-medium">
                                Department
                            </label>

                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className={`rounded-lg border ${fieldStyles.department.border} ${fieldStyles.department.bg} text-text dark:text-text-inverted p-3 ${fieldStyles.department.ring}`}
                            >
                                {DEPARTMENTS.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-base font-medium">
                                Your Question / Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className={`rounded-lg border ${fieldStyles.message.border} ${fieldStyles.message.bg} text-text dark:text-text-inverted p-3 ${fieldStyles.message.ring}`}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer from-light-yellow to-bright-yellow text-text rounded-xl bg-gradient-to-r px-6 py-3 font-semibold shadow-md transition hover:brightness-110"
                        >
                            Send
                        </button>
                    </form>
                ) : (
                    <div className="text-green-600 text-lg font-semibold mt-6">
                        ✅ Thank you for your message!
                    </div>
                )}

                <div className="mt-16 text-center">
                    <h2 className="mb-2 text-2xl font-semibold">Connect With Us</h2>

                    <p className="mb-4 text-lg opacity-80">
                        Hop into our Discord and follow us on socials to stay in the loop
                        with events, projects, and all the exciting things happening in the
                        club.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                            <a
                                key={name}
                                href={href}
                                className="text-text dark:text-text-inverted hover:opacity-80"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={name}
                            >
                                <Icon size={35} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
