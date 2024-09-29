import { Chip, Typography } from "@mui/material";

export const glowingCardStyle = (
  primaryColor: string,
  secondaryColor: string
) => {
  return {
    boxShadow: `0 0 5px ${primaryColor}`,
    transition: "box-shadow 0.3s ease-in-out",
    borderRadius: 1,
    "&:hover": {
      boxShadow: `0 0 20px ${primaryColor}, 0 0 10px ${secondaryColor}`,
    },
  };
};

export const nodeTitleChipStyle = (
  title: string,
  icon: JSX.Element,
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
) => {
  return (
    <Chip
      sx={{ m: 1 }}
      color={color}
      icon={icon}
      label={
        <Typography variant="button" fontSize={12}>
          {title}
        </Typography>
      }
    />
  );
};
