module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["airbnb", "eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: false
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    //indent: [2, 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "windows"],
    semi: ["error", "always"],
    "no-console": "off"
  }
};
