import { defineConfig } from 'repomix';

export default defineConfig({
  // Input settings
  input: {
    maxFileSize: 50000000 // Skip large binary files 
  },
  
  // Output configuration optimized for React projects
  output: {
    filePath: 'koryoonui-dump.md', // Using .md extension for Markdown output
    style: 'markdown', // Using markdown format instead of XML
    removeComments: false, // Keep comments for context (especially JSX comments)
    removeEmptyLines: false,
    showLineNumbers: true, // Helpful for referencing code
    directoryStructure: true, // Important for React's component structure
    fileSummary: true,
    topFilesLength: 10, // Show more files in summary for React projects
    
    // Git integration
    git: {
      sortByChanges: true, // Highlight frequently changed files
      sortByChangesMaxCommits: 100,
      includeDiffs: false,
      includeLogs: false
    }
  },
  
  // Focus on React-specific files
  include: [
    'src/**/*.{js,jsx,ts,tsx}', // Core React components
    'src/**/*.{css,scss,module.css,module.scss}', // Styling files
    '*.json', // package.json and other configs
    '*.config.{js,ts}', // Webpack, Vite, Next.js configs
    '*.{md,mdx}', // Documentation
    'env*', // Environment variables
    '.env*',
    '**/components/**/*', // Component directories
    '**/hooks/**/*', // Custom hooks
    '**/utils/**/*', // Utility functions
    '**/context/**/*', // Context providers
    '**/store/**/*', // State management
    '**/lib/**/*', // Library code
    '**/api/**/*' // API integration
  ],
  
  // Critical exclusions for React projects
  ignore: {
    useGitignore: true,
    useDotIgnore: true,
    useDefaultPatterns: true,
    customPatterns: [
      'node_modules',
      '.git',
      '.svn',
      '.hg',
      '.next',
      '.vercel',
      'dist',
      'build',
      'out',
      '.cache',
      '.turbo',
    // Temporary files
    'temp/**',
      'tmp/**',
      'coverage/**',
      'public/**/*.{mp4,avi,mov,mp3,wav}',
      'public/**/*.{zip,rar,7z,tar,gz}'
    ]
  },
  
});