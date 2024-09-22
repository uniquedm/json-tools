export interface Action {
  actionName: string;
  actionDesc: string;
  actionIcon: React.ReactNode;
  actionHandler: () => void;
  actionColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  menuOptions?: React.ReactNode; // Optional property for additional menu options
}
