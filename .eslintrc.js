module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: false
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "jsx-a11y"],
  parser: "babel-eslint",
  rules: {
    //"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    // indent: ["error", 2],
    // "linebreak-style": ["error", "windows"],
    // semi: ["error", "always"],
    "no-console": "off",
    "react/prop-types": "off"
    // "import/no-extraneous-dependencies": "error",
    // "import/extensions": [".js", ".jsx"],
    // "react/jsx-one-expression-per-line": "off",
    // "react/forbid-prop-types": "off",
    // "react/prefer-stateless-function": "off"
  },
  settings: {
    'react': {
      "version": "^16.7.0-alpha.2"
    }
  }
};
