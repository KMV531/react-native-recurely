/** @type {import('jest').Config} */
const config = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // Mock expo's winter runtime to avoid lazy getter issues in Jest
    "^expo/src/winter$": "<rootDir>/__mocks__/expo-winter.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|dayjs)",
  ],
};

module.exports = config;