import { Key } from "@mui/icons-material";
import { Card, CardActions, TextField, useTheme } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { glowingCardStyle, nodeTitleChipStyle } from "../../data/NodeStyle";
import { SecretNodeData } from "../../types/nodes/NodeTypes";

// Define SecretKeyNode component and type for props
interface SecretKeyNodeProps {
  data: SecretNodeData; // Type for the data prop
}

const SecretKeyNode: React.FC<SecretKeyNodeProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme
  return (
    <Card
      sx={glowingCardStyle(
        theme.palette.warning.main,
        theme.palette.secondary.main
      )}
      variant="elevation"
    >
      {nodeTitleChipStyle("Secret", <Key />, "warning")}
      <CardActions>
        <TextField
          label="Secret"
          variant="outlined"
          size="small"
          fullWidth
          value={data.secret}
          onChange={(e) => data.setSecret(e.target.value)} // Use the setSecret function from data
        />
      </CardActions>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Right} />
    </Card>
  );
};

export default SecretKeyNode;
