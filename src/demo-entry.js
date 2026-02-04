/**
 * Koryoon demo — loads hierarchy and initializes the viewer
 */
import { init } from './koryoon';

init({
  container: '#koryoon-root',
  hierarchy: {},
  hierarchyUrl: '/hiphop.json',
  rootNodeId: 'hiphop',
});
