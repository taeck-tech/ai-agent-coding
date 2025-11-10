import StyleDictionary from "style-dictionary";

// Create Style Dictionary instance with configuration
const sd = new StyleDictionary({
  // Source tokens file path
  source: ["./src/tokens/tokens.json"],
  platforms: {
    json: {
      // Transform token names to kebab case
      transforms: ["name/kebab"], // token name format, default is camel
      // Output directory path
      buildPath: "./src/tokens/", // output file path
      files: [
        {
          // Output file name
          destination: "tokens-colors.json", // output token file name
          // Output format as nested JSON
          format: "json/nested",
          filter: token => token["$type"] === "color",
        },
        {
          // Output file name
          destination: "tokens-typography.json", // output token file name
          // Output format as nested JSON
          format: "json/nested",
          filter: token => token["$type"] === "typography",
        },
      ],
    },
  },
});

// Clean and build all platforms
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
