module.exports = {
  // this will check Typescript files
  "**/*.(ts|tsx)": () => "npx tsc --noEmit",

  // This will lint and format TypeScript and                                             //JavaScript files
  "**/*.(ts|tsx|js)": (filenames) => [
    `npx eslint --fix ${filenames.join(" ")}`,
  ],
};
