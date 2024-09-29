import { alpha, Backdrop, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BlurredBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: "blur(2px)",
  backgroundColor: alpha(theme.palette.background.default, 0.4),
}));

export const ScrollableTextField = styled(TextField)(({}) => ({
  "& .MuiInputBase-root": {
    maxHeight: "200px",
    overflowY: "auto",
  },
}));
