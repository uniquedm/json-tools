export const defaultEditorValue = `{
    "stringField": "Hello, world!",
    "numberField": 12345,
    "booleanField": true,
    "nullField": null,
    "arrayField": [1, "two", false, null, {"nestedObject": "value"}],
    "objectField": {
      "nestedString": "Nested Hello",
      "nestedNumber": 67890,
      "nestedBoolean": false,
      "nestedArray": [5, 6, 7],
      "nestedObject": {
        "deepNestedField": "Deep value"
      }
    }
  }`

export const defaultModifiedValue = `{
    "stringField": "Hello, world!",
    "numberField": 12345,
    "booleanField": true,
    "arrayField": [1, "two", false, {"nestedObject": "value"}],
    "objectField": {
      "nestedString": "Nested Hello",
      "nestedNumber": 67890,
      "nestedBoolean": false,
      "nestedArray": [5, 6, 7],
      "nestedObject": {
        "deepNestedField": "Deep value"
      }
    }
  }`

export const defaultEditorJSON = {
  "stringField": "Hello, world!",
  "numberField": 12345,
  "booleanField": true,
  "nullField": null,
  "arrayField": [1, "two", false, null, { "nestedObject": "value" }],
  "objectField": {
    "nestedString": "Nested Hello",
    "nestedNumber": 67890,
    "nestedBoolean": false,
    "nestedArray": [5, 6, 7],
    "nestedObject": {
      "deepNestedField": "Deep value"
    }
  }
}

export const supportedLanguages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",        // C#
  "cpp",           // C++
  "php",
  "ruby",
  "html",
  "css",
  "scss",
  "less",
  "shell",         // Shell scripting
  "sql",
  "json",
  "xml",
  "yaml",
  "markdown",
  "dockerfile",
  "go",
  "swift",
  "kotlin",
  "r",
  "perl",
  "lua",
  "powershell",
  "plaintext",
  "objective-c",
  "scala",
  "rust",
  "graphql",
  "dart",
  "bat",           // Batch scripting
  "ini",
  "handlebars",
  "pug",
  "protobuf",      // Protocol Buffers (proto)
  "razor",
  "clojure",
  "elixir",
  "julia",
  "fsharp",        // F#
  "sol",           // Solidity
  "hcl",           // HashiCorp Configuration Language
  "apex",
  "abap",
  "cypher",
  "twig",
  "freemarker2",
  "freemarker2.tag-angle.interpolation-dollar",
  "freemarker2.tag-bracket.interpolation-dollar",
  "freemarker2.tag-angle.interpolation-bracket",
  "freemarker2.tag-bracket.interpolation-bracket",
  "freemarker2.tag-auto.interpolation-dollar",
  "freemarker2.tag-auto.interpolation-bracket",
  "azcli",
  "bicep",
  "cameligo",
  "coffeescript",
  "c",
  "csp",
  "flow9",
  "lexon",
  "liquid",
  "m3",
  "mdx",
  "mips",
  "msdax",
  "mysql",
  "pascal",
  "pascaligo",
  "pgsql",
  "pla",
  "postiats",
  "powerquery",
  "qsharp",
  "redis",
  "redshift",
  "restructuredtext",
  "sb",            // Small Basic
  "scheme",
  "sparql",
  "st",            // Structured Text
  "systemverilog",
  "verilog",
  "tcl",
  "typespec",
  "vb",
  "wgsl",
  "aes",           // Advanced Encryption Standard
  "ecl"            // ECL (Enterprise Control Language)
];