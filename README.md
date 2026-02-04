# Koryoon UI

3D hierarchy visualization library — interactive sphere navigation built with React Three Fiber.

## Installation

```bash
npm install koryoon-ui
```

## Usage

### CDN (IIFE)

```html
<link rel="stylesheet" href="https://unpkg.com/koryoon-ui/dist/koryoon.css">
<script src="https://unpkg.com/koryoon-ui/dist/koryoon.min.js"></script>
<div id="koryoon-root"></div>
<script>
  Koryoon.init({
    container: '#koryoon-root',
    hierarchy: { /* your hierarchy */ },
    rootNodeId: 'root',
    hierarchyUrl: '/path/to/hierarchy.json'  // optional
  });
</script>
```

### With a bundler

Import the built IIFE and styles:

```js
import 'koryoon-ui/style';

// Script adds Koryoon to window, or load via script tag
const { init } = window.Koryoon;

init({
  container: '#koryoon-root',
  hierarchy: yourHierarchy,
  rootNodeId: 'root',
  hierarchyUrl: '/api/hierarchy.json',
  config: { scale: { sphereSizeBase: 10 } },
  onStateChange: (state) => console.log(state)
});
```

## Hierarchy format

Each node needs `id`, `name`, `parentId`, `childrenIds`. Root has `parentId: null`.

```json
{
  "root": {
    "id": "root",
    "name": "Root",
    "parentId": null,
    "childrenIds": ["child1", "child2"]
  },
  "child1": {
    "id": "child1",
    "name": "Child 1",
    "parentId": "root",
    "childrenIds": []
  }
}
```

## Examples

See `examples/demo.html` and `examples/sample-hierarchy.json` in the package.

## License

MIT
