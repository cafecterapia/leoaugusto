"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SocialLinksProps {
  className?: string;
}

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/leoaugusto",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/leoaugusto",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.017 0C8.396 0 7.999.016 6.79.08 5.588.144 4.729.304 3.99.636c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.302 4.878.142 5.737.078 6.94.016 8.148 0 8.545 0 12.017c0 3.47.016 3.868.078 5.076.064 1.204.224 2.062.552 2.8.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.738.328 1.596.488 2.8.552 1.208.064 1.605.08 5.076.08 3.47 0 3.868-.016 5.076-.08 1.203-.064 2.062-.224 2.8-.552.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.328-.738.488-1.596.552-2.8.064-1.208.08-1.605.08-5.076 0-3.472-.016-3.87-.08-5.076-.064-1.204-.224-2.062-.552-2.8a5.706 5.706 0 00-1.384-2.126A5.706 5.706 0 0019.913.63c-.738-.328-1.597-.488-2.8-.552C15.905.016 15.508 0 12.017 0zm0 2.17c3.404 0 3.808.012 5.15.071 1.243.057 1.915.267 2.364.444.595.23 1.02.505 1.465.95.445.444.72.87.95 1.464.178.45.388 1.122.444 2.364.06 1.342.072 1.746.072 5.15 0 3.404-.012 3.808-.072 5.15-.056 1.242-.266 1.914-.444 2.364-.23.594-.505 1.02-.95 1.464-.444.445-.87.72-1.464.95-.45.178-1.122.388-2.364.444-1.342.06-1.746.072-5.15.072-3.404 0-3.808-.012-5.15-.072-1.242-.056-1.914-.266-2.364-.444a3.933 3.933 0 01-1.464-.95A3.933 3.933 0 012.67 19.24c-.178-.45-.388-1.122-.444-2.364-.06-1.342-.072-1.746-.072-5.15 0-3.404.012-3.808.072-5.15.056-1.242.266-1.914.444-2.364.23-.594.505-1.02.95-1.464A3.933 3.933 0 014.084 2.67c.45-.178 1.122-.388 2.364-.444 1.342-.06 1.746-.072 5.15-.072z"
          clipRule="evenodd"
        />
        <path d="M12.017 15.33a3.312 3.312 0 100-6.625 3.312 3.312 0 000 6.625zM12.017 7.729a4.283 4.283 0 110 8.566 4.283 4.283 0 010-8.566z M18.408 6.234a1.015 1.015 0 11-2.03 0 1.015 1.015 0 012.03 0z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@leoaugusto",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://twitter.com/leoaugusto",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger when 30% of the section is visible
    triggerOnce: false, // Allow re-triggering when scrolling back
    rootMargin: "-100px 0px", // Add some margin to make it feel more natural
  });

  return (
    <div ref={ref} className={`${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
        className="flex items-center justify-center space-x-6"
      >
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: {
                duration: 0.1,
                ease: "easeOut",
              },
            }}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200 border border-white/20"
            aria-label={`Follow on ${social.name}`}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
