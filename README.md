# [JSON Tools](https://uniquedm.github.io/json-tools/)

A simple web application that provides various JSON tools to help you work with JSON data more effectively. The app includes features like JSON Formatting, JSON Path Evaluation, a JSON Viewer, and a Difference Editor for comparing JSON data.

## Features

- **JSON Formatting**: Easily format and beautify your JSON data for better readability.
- **JSON Path Evaluation**: Extract specific data from JSON using JSONPath expressions.
- **JSON Tree**: Visualize your JSON data in a tree view, making it easier to navigate through nested structures.
- **Difference Editor**: Compare two sets of JSON data side by side to quickly identify differences.

### Built With

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**:
  - [@emotion/react](https://emotion.sh/docs/@emotion/react)
  - [@emotion/styled](https://emotion.sh/docs/@emotion/styled)
  - [@mui/material](https://mui.com/)
  - [@mui/icons-material](https://mui.com/material-ui/material-icons/)
- **Editor**: [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react)
- **HTTP Client**: [axios](https://axios-http.com/)
- **JSON Editor**: [json-edit-react](https://www.npmjs.com/package/json-edit-react)
- **JSON Path**: [jsonpath-plus](https://www.npmjs.com/package/jsonpath-plus)
- **JSON Repair**: [jsonrepair](https://www.npmjs.com/package/jsonrepair)
- **JWT Decode**: [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- **JSON Schema Validator**: [ajv](https://www.npmjs.com/package/ajv)
- **Routing**: [react-router-dom](https://reactrouter.com/)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/uniquedm/json-tools.git
   cd json-tools
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   Or, if you're using yarn:

   ```bash
   yarn install
   ```

### Running the App

To start the development server, run:

```bash
npm run dev
```

Or, if you're using yarn:

```bash
yarn dev
```

The app will be available at http://localhost:5173/json-tools

### Building for Production

To build the app for production, run:

```
npm run build
```

Or, if you're using yarn:

```
yarn build
```

The optimized and minified files will be generated in the dist/ directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue to suggest improvements or report bugs.

## [License](./LICENSE)

This project is licensed under the GNU General Public License v3.0
