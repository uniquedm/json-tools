export const removeNullValues = (json: any): any => {
  if (Array.isArray(json)) {
    return json
      .map((item) => removeNullValues(item))
      .filter((item) => item !== null);
  } else if (json !== null && typeof json === "object") {
    return Object.entries(json).reduce((acc, [key, value]) => {
      const cleanedValue = removeNullValues(value);
      if (cleanedValue !== null) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {} as Record<string, any>);
  }
  return json;
};
