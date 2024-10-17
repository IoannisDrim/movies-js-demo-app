import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        process: true,
        module: true,
        ...globals.browser
      }
    },
    ignores: ["webpack/**", "**/*.spec.*"],
    ...pluginJs.configs.recommended
  }
];