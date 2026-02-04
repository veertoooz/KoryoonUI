import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const inlineHierarchy = {
  root: {
    id: "root",
    name: "Root",
    parentId: null,
    childrenIds: ["child1", "child2"],
    depth: 0,
    color: "primary",
    icon: "🌍"
  },
  child1: {
    id: "child1",
    name: "Child 1",
    parentId: "root",
    childrenIds: [],
    depth: 1,
    color: "secondary",
    icon: "⚡"
  },
  child2: {
    id: "child2",
    name: "Child 2",
    parentId: "root",
    childrenIds: [],
    depth: 1,
    color: "accent",
    icon: "✨"
  }
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koryoon — Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; }
    #koryoon-root { width: 100%; height: 100%; }
  </style>
  <link rel="stylesheet" href="koryoon.css">
</head>
<body>
  <div id="koryoon-root"></div>
  <script src="koryoon.min.js"></script>
  <script>
    Koryoon.init({
      container: '#koryoon-root',
      hierarchy: ${JSON.stringify(inlineHierarchy)},
      rootNodeId: 'root'
    });
  </script>
</body>
</html>
`;

writeFileSync(join(dist, "index.html"), html);
console.log("Wrote dist/index.html");
