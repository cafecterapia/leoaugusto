"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SocialLinksProps {
  className?: string;
}

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/augustoleonardo.prof",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C8.74 0 8.33.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.33 0 8.74 0 12s.015 3.67.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.33 23.988 8.74 24 12 24s3.67-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.67-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C19.76 1.347 19.091.936 18.302.63 17.537.333 16.667.131 15.39.072 14.113.012 13.703 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
  {
    name: "Localização",
    url: "https://maps.google.com/?q=Rua+Teófilo+Otoni+52+Sala+201+Centro+Rio+de+Janeiro+RJ",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:Imf.advocaciamilitar@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      backgroundColor: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
      borderColor: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
    },
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
  tap: {
    scale: 0.98,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transition: {
      duration: 0.1,
      ease: "easeOut" as const,
    },
  },
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const { ref, inView } = useInView({
    threshold: 0.1, // Reduced threshold for earlier trigger
    triggerOnce: false, // Allow re-triggering when scrolling back
    rootMargin: "0px 0px -50px 0px", // Optimized margin for better performance
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
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center w-12 h-12 rounded-full text-white border will-change-transform"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)", // Safari support
            }}
            aria-label={`Follow on ${social.name}`}
          >
            <motion.div
              initial={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              {social.icon}
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
