import React from "react";
import { Utility } from "../../data/DrawerData";

// Function to render the component with its props
export default function renderUtility(utility: Utility) {
  if (!utility) {
    return null;
  }

  const { component, props } = utility;

  // Clone the component and pass the props dynamically
  return React.cloneElement(component, { ...props });
}
