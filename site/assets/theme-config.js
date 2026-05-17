window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#fcf8ff",
        "surface-dim": "#dbd8e4",
        "surface-bright": "#fcf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f2fe",
        "surface-container": "#efecf8",
        "surface-container-high": "#e9e6f3",
        "surface-container-highest": "#e4e1ed",
        "surface-variant": "#e4e1ed",
        "surface-tint": "#494bd6",
        "on-surface": "#1b1b23",
        "on-surface-variant": "#464554",
        "inverse-surface": "#303038",
        "inverse-on-surface": "#f2effb",
        "outline": "#767586",
        "outline-variant": "#c7c4d7",
        "primary": "#4648d4",
        "on-primary": "#ffffff",
        "primary-container": "#6063ee",
        "on-primary-container": "#fffbff",
        "inverse-primary": "#c0c1ff",
        "primary-fixed": "#e1e0ff",
        "primary-fixed-dim": "#c0c1ff",
        "on-primary-fixed": "#07006c",
        "on-primary-fixed-variant": "#2f2ebe",
        "secondary": "#006c49",
        "on-secondary": "#ffffff",
        "secondary-container": "#6cf8bb",
        "on-secondary-container": "#00714d",
        "secondary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#4edea3",
        "on-secondary-fixed": "#002113",
        "on-secondary-fixed-variant": "#005236",
        "tertiary": "#904900",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#b55d00",
        "on-tertiary-container": "#fffbff",
        "tertiary-fixed": "#ffdcc5",
        "tertiary-fixed-dim": "#ffb783",
        "on-tertiary-fixed": "#301400",
        "on-tertiary-fixed-variant": "#703700",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "background": "#fcf8ff",
        "on-background": "#1b1b23"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "unit": "4px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "gutter": "24px",
        "margin-mobile": "16px",
        "margin-desktop": "40px"
      },
      fontFamily: {
        "h1": ["Inter"], "h2": ["Inter"], "h3": ["Inter"],
        "body-lg": ["Inter"], "body-md": ["Inter"],
        "label-md": ["Inter"], "label-sm": ["Inter"]
      },
      fontSize: {
        "h1": ["30px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h3": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }]
      }
    }
  }
};
