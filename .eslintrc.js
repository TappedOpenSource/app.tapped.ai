module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "plugin:security/recommended",
    "plugin:react-hooks/recommended",
    "google",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: ["tsconfig.json"],
  //   sourceType: "module",
  // },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    "object-curly-spacing": [1, "always"],
    "import/no-unresolved": 0,
    "import/prefer-default-export": "off",
    "indent": ["error", 2],
    "new-cap": 0,
    "require-jsdoc": 0,
    "max-len": [0, { code: 120 }],
    "no-case-declarations": 0,
    "linebreak-style": 0,
    "sonarjs/cognitive-complexity": 0,
    "sonarjs/no-duplicate-string": 0,
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "security/detect-object-injection": 0,
  },
};
