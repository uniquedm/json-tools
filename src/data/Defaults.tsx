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
