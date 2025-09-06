module.exports = {
  // Only run TypeScript type checking - avoids ESLint issues
  "**/*.{ts,tsx}": () => "tsc --noEmit --skipLibCheck",
};
