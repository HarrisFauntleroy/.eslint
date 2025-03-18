import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import storybookPlugin from "eslint-plugin-storybook";
import prettier from "eslint-config-prettier";

/** @type {import('@eslint/eslintrc').FlatConfigArray} */
export default [
  // Ignore patterns
  {
    ignores: [
      "node_modules",
      "dist",
      "webpack.config.js",
      "postcss.config.js",
      "jest.config.js",
      "vitest.config.ts",
      "vite.config.ts",
      "*.test.*",
      "*.lock",
    ],
  },

  // Base config with globals
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Core recommended configs
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // React setup with version detection
  {
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: pluginReact.configs.flat.recommended.rules,
  },

  // Main configuration with all plugins
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "unused-imports": unusedImportsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unsafe-optional-chaining": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
          "ts-nocheck": "allow-with-description",
          "ts-expect-error": "allow-with-description",
          minimumDescriptionLength: 10,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-var-requires": "error",
      "prettier/prettier": "warn",
      "react-hooks/exhaustive-deps": "error",

      // Unused imports rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Explicitly disable storybook rules for non-story files
  {
    files: [
      "**/*.{js,jsx,ts,tsx}",
      "!**/*.stories.{js,jsx,ts,tsx}",
      "!**/*.story.{js,jsx,ts,tsx}",
    ],
    rules: {
      "storybook/default-exports": "off",
      "storybook/hierarchy-separator": "off",
      "storybook/no-redundant-story-name": "off",
      "storybook/prefer-pascal-case": "off",
      "storybook/csf-component": "off",
      "storybook/meta-inline-properties": "off",
      "storybook/no-stories-of": "off",
      "storybook/no-title-property-in-meta": "off",
      "storybook/story-exports": "off",
      "storybook/use-storybook-expect": "off",
      "storybook/use-storybook-testing-library": "off",
    },
  },

  // Storybook config
  {
    files: [
      "*.stories.@(js|jsx|ts|tsx|mdx)",
      "**/*.stories.@(js|jsx|ts|tsx|mdx)",
    ],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
      "import/no-anonymous-default-export": "off",
    },
  },

  // TypeScript specific overrides
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },

  // Prettier must be last
  {
    rules: prettier.rules,
  },
];
