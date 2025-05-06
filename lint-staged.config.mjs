const lintStagedConfig = {
  // Run type checking on TypeScript files
  "**/*.{ts,tsx}": () => "pnpm tsc --noEmit",

  // Run ESLint and Prettier on JS/TS files
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    `pnpm eslint --fix ${filenames.join(" ")}`,
    `pnpm prettier --write ${filenames.join(" ")}`,
  ],

  // Run Prettier on other file types
  "**/*.{json,md,css,scss}": (filenames) =>
    `pnpm prettier --write ${filenames.join(" ")}`,
};

export default lintStagedConfig;
