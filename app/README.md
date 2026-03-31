# Angular Expandable Table

A simple Angular application demonstrating an expandable, multi-select table component.

## Features

- **Expandable Rows**: Click the `+` button to expand rows with children
- **Multi-Select**: Click any row to select/deselect it
- **Visual Feedback**: Hover effects and selection highlighting
- **Hierarchical Data**: Supports nested row structures

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Usage

- **Expand/Collapse**: Click the `+`/`−` button next to rows with children
- **Select Rows**: Click anywhere on a row to select/deselect it
- **View Selection**: Selected IDs are displayed below the table

## Project Structure

```
src/
├── app/
│   ├── app.ts          # Main component logic
│   ├── app.css         # Component styles
│   ├── task3.html      # Component template
│   └── app.config.ts   # Angular app configuration
├── assets/
│   └── rows.json       # Sample data
└── index.html          # Main HTML file
```

## Data Format

The table expects data in the following format:

```json
{
  "rows": [
    {
      "id": "1",
      "text1": "text 1.1",
      "text2": "text 1.2",
      "children": []
    }
  ]
}
```

## Development

- **Build**: `npm run build`
- **Test**: `npm test`
- **Lint**: `npx ng lint`
