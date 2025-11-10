/** @type {import('tailwindcss').Config} */
const colors = require("./tokens/tokens-colors.json");

module.exports = {
  theme: {
    fontSize: {
      headline1: "56px",
      headline2: "48px",
      headline3: "32px",
      headline4: "24px",
      subtitle1: "28px",
      subtitle2: "24px",
      subtitle3: "20px",
      subtitle4: "18px",
      subtitle5: "16px",
      body1: "18px",
      body2: "16px",
      body3: "14px",
      button: "14px",
      caption: "12px",
      overline: "12px",
    },
    extend: {
      colors: {
        ...colors,
        primary: { DEFAULT: colors.primary["500"], ...colors.primary },
        secondary: { DEFAULT: colors.secondary["500"], ...colors.secondary },
        success: { DEFAULT: colors.success["500"], ...colors.success },
        warning: { DEFAULT: colors.warning["500"], ...colors.warning },
        danger: { DEFAULT: colors.danger["400"], ...colors.danger },
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        DEFAULT: "1.5",
      },

      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },

    darkMode: "class",
    plugins: [],
  },
  corePlugins: {
    preflight: false,
  },
};
