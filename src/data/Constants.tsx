export const supportedLanguages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp", // C#
  "cpp", // C++
  "php",
  "ruby",
  "html",
  "css",
  "scss",
  "less",
  "shell", // Shell scripting
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
  "bat", // Batch scripting
  "ini",
  "handlebars",
  "pug",
  "protobuf", // Protocol Buffers (proto)
  "razor",
  "clojure",
  "elixir",
  "julia",
  "fsharp", // F#
  "sol", // Solidity
  "hcl", // HashiCorp Configuration Language
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
  "sb", // Small Basic
  "scheme",
  "sparql",
  "st", // Structured Text
  "systemverilog",
  "verilog",
  "tcl",
  "typespec",
  "vb",
  "wgsl",
  "aes", // Advanced Encryption Standard
  "ecl", // ECL (Enterprise Control Language)
];

export const jsonPathHelpData = [
  { xpath: "/", jsonpath: "$", description: "the root object/element" },
  { xpath: ".", jsonpath: "@", description: "the current object/element" },
  { xpath: "/", jsonpath: ". or []", description: "child operator" },
  { xpath: "..", jsonpath: "n/a", description: "parent operator" },
  {
    xpath: "//",
    jsonpath: "..",
    description: "recursive descent. JSONPath borrows this syntax from E4X.",
  },
  {
    xpath: "*",
    jsonpath: "*",
    description: "wildcard. All objects/elements regardless their names.",
  },
  {
    xpath: "@",
    jsonpath: "n/a",
    description: "attribute access. JSON structures don't have attributes.",
  },
  {
    xpath: "[]",
    jsonpath: "[]",
    description:
      "subscript operator. XPath uses it to iterate over element collections and for predicates. In Javascript and JSON it is the native array operator.",
  },
  {
    xpath: "|",
    jsonpath: "[,]",
    description:
      "Union operator in XPath results in a combination of node sets. JSONPath allows alternate names or array indices as a set.",
  },
  {
    xpath: "n/a",
    jsonpath: "[start:end:step]",
    description: "array slice operator borrowed from ES4.",
  },
  {
    xpath: "[]",
    jsonpath: "?()",
    description: "applies a filter (script) expression.",
  },
  {
    xpath: "n/a",
    jsonpath: "()",
    description: "script expression, using the underlying script engine.",
  },
  { xpath: "()", jsonpath: "n/a", description: "grouping in Xpath" },
];

export const sourceLanguage = ["json"];

export const targetLanguage = ["yaml"];
