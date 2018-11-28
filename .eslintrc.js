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
    "no-console": "off",
    "react/prop-types": "off"
  },
  settings: {
    'react': {
      "createClass": "createReactClass", 
      "pragma": "React",
      "version": "999.999.999"
    }
  }
};
