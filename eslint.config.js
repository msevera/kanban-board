import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1️⃣ Base configs (TypeScript + React)
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended, // 👈 no spread here!

  // 2️⃣ Your project-specific overrides
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect", // Auto-detect React version
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Disable outdated React rules (React 17+)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
]);
