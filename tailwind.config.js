/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Base colors for light/dark mode
        "custom-background": "#ffffff",
        "custom-foreground": "#333333",
        "background-dark": "#121212",
        "foreground-dark": "#f5f5f5",

        // Your existing burgundy palette
        burgundy: {
          50: "#fdf2f4",
          100: "#fbe6e9",
          200: "#f5cdd3",
          300: "#eba5b3",
          400: "#e17a8f",
          500: "#d25070",
          600: "#800020", // Main burgundy color
          700: "#6b001c",
          800: "#570017",
          900: "#4a0015",
          950: "#2e000d",
        },
        // Dark mode colors
        dark: {
          primary: "#121212",
          secondary: "#1E1E1E",
          elevated: "#2D2D2D",
          muted: "#6B7280",
          accent: "#800020", // Using burgundy as accent in dark mode
        },
        gold: "#d4af37",
        navy: "#00243d",
        emerald: {
          custom: "#008755",
        },
        plum: "#660066",
        cream: "#f5f5dc",
        silver: "#c0c0c0",
        "silver-dark": "#A9A9A9",
        "silver-light": "#E8E8E8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        theme: "background-color, color, border-color, text-decoration-color, fill, stroke",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) translateX(15px) rotate(5deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "50%": { transform: "translateY(20px) translateX(-15px) rotate(-5deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "50%": { transform: "translateY(-15px) translateX(10px) scale(1.05)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.05 },
          "50%": { opacity: 0.2 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInOut: {
          "0%, 100%": { opacity: 0.1 },
          "50%": { opacity: 0.3 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-15px)" },
          "75%": { transform: "translateY(15px)" },
        },
        themeSwitch: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out forwards",
        "float-slow": "floatSlow 15s ease-in-out infinite",
        "float-medium": "floatMedium 12s ease-in-out infinite",
        "float-fast": "floatFast 8s ease-in-out infinite",
        "pulse-slow": "pulseSlow 10s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        "fade-in-out": "fadeInOut 7s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        wave: "wave 10s ease-in-out infinite",
        "theme-switch": "themeSwitch 0.5s ease-in-out",
      },
      backgroundImage: {
        "gradient-burgundy-gold": "linear-gradient(to right, #6b001c, #800020, #d4af37)",
        "gradient-silver": "linear-gradient(to right, #333333, #555555, #999999)",
        "gradient-dark": "linear-gradient(to bottom, #121212, #1E1E1E)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
}
