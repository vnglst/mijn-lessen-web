const { version } = require("./package.json");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  serverExternalPackages: ["msw"],
  i18n: {
    locales: ["nl"],
    defaultLocale: "nl",
  },
  env: {
    NEXT_GIT_SHA: process.env.NEXT_GIT_SHA,
    NEXT_VERSION: version,
  },
});
