// Mock for expo/src/winter to avoid lazy getter issues in Jest
// The winter runtime installs global polyfills that fail in Jest environment
module.exports = {};