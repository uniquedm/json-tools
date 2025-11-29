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
  }`;

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
  }`;

export const defaultEditorJSON = {
  stringField: "Hello, world!",
  numberField: 12345,
  booleanField: true,
  nullField: null,
  arrayField: [1, "two", false, null, { nestedObject: "value" }],
  objectField: {
    nestedString: "Nested Hello",
    nestedNumber: 67890,
    nestedBoolean: false,
    nestedArray: [5, 6, 7],
    nestedObject: {
      deepNestedField: "Deep value",
    },
  },
};
export const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <person>
    <name>John Doe</name>
    <age>30</age>
    <city>New York</city>
  </person>
  <items>
    <item id="1">Item 1</item>
    <item id="2">Item 2</item>
  </items>
</root>`;

export const defaultYAML = `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
`;

export const defaultURL = "https://www.example.com/search?q=hello world&lang=en";

export const defaultBase64 = "Hello, World!";
