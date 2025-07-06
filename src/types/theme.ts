// Custom type definitions for the project

export interface ColorTheme {
  primary: string;
  secondary: string;
  surface: {
    primary: string;
    secondary: string;
    accent: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  background: {
    primary: string;
    secondary: string;
    dark: string;
  };
}

// Extend the global CSS module declarations if needed
declare module '*.module.css' {
  const classes: { [key: string]: string };
}

// Color constants for programmatic use
export const THEME_COLORS = {
  surface: {
    primary: 'surface-primary',
    secondary: 'surface-secondary',
    accent: 'surface-accent',
  },
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    inverse: 'text-inverse',
  },
  background: {
    primary: 'background-primary',
    secondary: 'background-secondary',
    dark: 'background-dark',
  },
} as const;

export type ThemeColorKey = keyof typeof THEME_COLORS;
