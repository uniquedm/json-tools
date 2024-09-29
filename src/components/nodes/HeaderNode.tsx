import { Security } from "@mui/icons-material";
import { Card, CardActions, SelectChangeEvent, useTheme } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { glowingCardStyle, nodeTitleChipStyle } from "../../data/NodeStyle";
import { HeaderNodeData } from "../../types/nodes/NodeTypes";
import AlgorithmSelect from "../jwt/AlgorithmSelect";
// Define HeaderNode component and type for props
interface HeaderNodeProps {
  data: HeaderNodeData; // Type for the data prop
}

const HeaderNode: React.FC<HeaderNodeProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme
  const handleChange = (event: SelectChangeEvent<string>) => {
    data.setHeader(event.target.value);
  };
  return (
    <Card
      sx={glowingCardStyle(
        theme.palette.primary.main,
        theme.palette.secondary.main
      )}
      variant="elevation"
    >
      {nodeTitleChipStyle("Header", <Security />, "primary")}
      <CardActions>
        <AlgorithmSelect
          disabled={data.mode === "decode"}
          selectedAlgorithm={data.header}
          handleChange={handleChange}
        />
      </CardActions>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Right} />
    </Card>
  );
};

export default HeaderNode;
