import React from "react";
import { Utility } from "../../data/DrawerData";

// Function to render the component with its props
export default function renderUtility(utility: Utility, props: any) {
  if (!utility) {
    return null;
  }
  // Clone the component and pass the props dynamically
  return React.cloneElement(utility.component, { ...props });
}
