#!/usr/bin/env node

//node create component Logo img atoms
const fs = require("fs");
const path = require("path");
const templatePath = path.join(__dirname, "template.txt");
const storiesTemplatePath = path.join(__dirname, "stories.txt");

// Template for the component
const componentTemplate = fs.readFileSync(templatePath, "utf8");
const storiesTemplate = fs.readFileSync(storiesTemplatePath, "utf8");

// Function to create a new component file
function createComponent(componentName, htmlTag, category) {
  // Replace template variables with provided arguments
  const content = componentTemplate
    .replace(/{{ComponentName}}/g, componentName)
    .replace(/{{htmlTag}}/g, htmlTag);

  // Create the file path
  const filePath = path.join(
    __dirname,
    "../..",
    "src",
    "ui",
    category,
    componentName,
    `${componentName}.tsx`,
  );

  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the file
  fs.writeFileSync(filePath, content.trim());

  console.log(`Component ${componentName} created at ${filePath}`);
}
function createStories(componentName, category) {
  const content = storiesTemplate.replace(/{{ComponentName}}/g, componentName);

  // Create the file path
  const filePath = path.join(
    __dirname,
    "../..",
    "src",
    "ui",
    category,
    componentName,
    `${componentName}.stories.tsx`,
  );

  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the file
  fs.writeFileSync(filePath, content.trim());

  console.log(`Component ${componentName} created at ${filePath}`);
}
// Parse command-line arguments
const [, , entity, componentName, htmlTag, category] = process.argv;

if (!componentName || !htmlTag || !category) {
  console.error(
    "Usage: node create component <ComponentName> <htmlTag> <category>",
  );
  process.exit(1);
}

if (entity === "component") {
  createComponent(componentName, htmlTag, category);
  createStories(componentName, category);
}
