/**
 * Custom hook for accessing theme colors in a type-safe way
 * Compatible with Tailwind CSS v4 approach using CSS custom properties
 */
export const useTheme = () => {
  const colors = {
    surface: {
      primary: 'surface-primary',
      secondary: 'surface-secondary',
    },
    // Fallback to standard Tailwind classes
    bg: {
      primary: 'bg-black text-white',
      secondary: 'bg-white text-black',
    },
  };

  return {
    colors,
  };
};

/**
 * Utility function to combine multiple classes
 * Useful for conditional styling
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Theme variants for consistent component styling
 * Using semantic class names and Tailwind utilities
 */
export const themeVariants = {
  section: {
    primary: 'surface-primary',
    secondary: 'surface-secondary',
  },
  rounded: {
    section: 'rounded-b-[1rem] sm:rounded-b-[2rem] lg:rounded-b-[3rem]',
  },
} as const;
