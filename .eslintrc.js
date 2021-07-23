module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // "plugin:vue/essential",
    // "plugin:prettier/recommended", // we added this line
    // // "@vue/prettier",
    // "eslint:recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue",
  ],
  rules: {
    "no-console": "off", //process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
