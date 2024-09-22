import React from "react";
import { UtilityDetails } from "../types/DrawerTypes";

// Function to render the component with its props
export default function renderUtility(utility: UtilityDetails, props: any) {
  if (!utility) {
    return null;
  }
  // Clone the component and pass the props dynamically
  return React.cloneElement(utility.component, { ...props });
}
