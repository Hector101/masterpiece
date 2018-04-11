module.exports = {
  "extends": [
    "standard",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "document": true,
    "window": true,
    "React": true,
    "$": true
  },
	"rules": {
    "max-len": [1, 80, 2],
    "indent": [2, 2],
    "semi": [2, "always"],
    "comma-dangle": [2, {
      "arrays": "never",
      "objects": "always",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }]
  }
};