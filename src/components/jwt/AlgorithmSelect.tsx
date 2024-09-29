import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { signingAlgorithms } from "../../data/JWTAlgorithms";

interface AlgorithmSelectProps {
  disabled?: boolean;
  selectedAlgorithm: string; // Define the type for selectedAlgorithm
  handleChange: (event: SelectChangeEvent<string>) => void; // Use SelectChangeEvent from MUI
}

const AlgorithmSelect: React.FC<AlgorithmSelectProps> = ({
  disabled = false,
  selectedAlgorithm,
  handleChange,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="algorithm-select-label">Algorithm</InputLabel>
      <Select
        disabled={disabled}
        size="small"
        className="nodrag nopan"
        labelId="algorithm-select-label"
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={handleChange}
        label="Algorithm"
      >
        {signingAlgorithms.map((algorithm) => (
          <MenuItem key={algorithm} value={algorithm}>
            <Typography variant="overline">{algorithm}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AlgorithmSelect;
