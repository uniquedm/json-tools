import { Chip, Typography } from "@mui/material";

export const glowingCardStyle = (
  primaryColor: string,
  secondaryColor: string
) => {
  return {
    boxShadow: `0 4px 20px -5px ${primaryColor}40`,
    transition: "all 0.3s ease-in-out",
    borderRadius: 4,
    background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}05)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${primaryColor}30`,
    "&:hover": {
      boxShadow: `0 8px 30px -5px ${primaryColor}60, 0 0 15px ${secondaryColor}20`,
      transform: 'translateY(-2px)',
      border: `1px solid ${primaryColor}50`,
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
