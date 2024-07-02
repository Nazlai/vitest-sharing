export default {
  "*.{ts,tsx}": [
    "prettier --write",
    "eslint",
    () => "tsc -p tsconfig.json --noemit",
  ],
  "*.js": ["prettier --write", "eslint"],
  "*.html": ["eslint", "prettier --write"],
  "*.{css,md,json,yaml,yml}": "prettier --write",
}
