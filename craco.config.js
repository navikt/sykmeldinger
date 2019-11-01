const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  eslint: {
    extends: ["eslint-config-react-app"],
    rules: {
      // ...
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    }
  }
};
