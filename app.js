import { sanitizeSchema } from "./scripts/schemaSanitizer.js";
import fs from "fs";
import path from "path";

const inputFolder = "schemas";
const outputFolder = "sanitizedSchemas";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

function processJsonFiles(inputFolder, outputFolder) {
  const files = fs.readdirSync(inputFolder);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const inputFilePath = path.join(inputFolder, file);
      const outputFilePath = path.join(outputFolder, `sanitized_${file}`);

      const inputJson = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));
      const removedObjects = [];
      sanitizeSchema(inputJson, removedObjects);

      // Log the removed objects
      console.log(`Removed Objects from ${inputFilePath}:`);
      console.log(JSON.stringify(removedObjects, null, 2));

      // Write the sanitized JSON to the output file
      fs.writeFileSync(outputFilePath, JSON.stringify(inputJson, null, 2));
      console.log(`Sanitized JSON saved to ${outputFilePath}`);
    }
  }
}

processJsonFiles(inputFolder, outputFolder);
