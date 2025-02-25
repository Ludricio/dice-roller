import js from "@eslint/js";
import globals from "globals";

export default [
    // Apply recommended rules to JS files
    // {
    //     files: ["**/*.js"],
    //     rules: js.configs.recommended.rules,
    // },

    // // Apply recommended rules to JS files with an override
    // {
    //     files: ["**/*.js"],
    //     name: "your-project/recommended-rules-with-override",
    //     rules: {
    //         ...js.configs.recommended.rules,
    //         "no-unused-vars": "warn",
    //     },
    // },

    // // Apply all rules to JS files
    {
        files: ["**/*.js"],
        name: "your-project/all-rules",
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "prefer-const": "error",
        },
        // env: {
        //     node: true,
        // },
    },
];
