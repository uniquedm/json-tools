import { DataObject, Key, Security, Token } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  Chip,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { glowingCardStyle, nodeTitleChipStyle } from "../../data/NodeStyle";
import { TokenNodeData } from "../../types/nodes/NodeTypes";
import { CopyIconButton } from "../CopyIconButton";

// Define TokenNode component and type for props
interface TokenNodeProps {
  data: TokenNodeData; // Type for the data prop
}

const TokenNode: React.FC<TokenNodeProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme

  return (
    <Card
      sx={glowingCardStyle(
        theme.palette.success.main,
        theme.palette.success.main
      )}
      variant="elevation"
    >
      {nodeTitleChipStyle("Token", <Token />, "success")}
      <CopyIconButton textToCopy={data.token} tooltip="Copy Token" />
      <Stack direction={"row"}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ ml: 0.1, mr: "auto", textAlign: "left" }}
        >
          <Box sx={{ position: "relative" }}>
            <Handle
              id="header"
              style={{ visibility: "hidden" }}
              type="target"
              position={Position.Left}
            />
            <Handle
              id="header"
              style={{ visibility: "hidden" }}
              type="source"
              position={Position.Left}
            />
            <Chip
              color={data.headerDecode ? "primary" : "default"}
              size="small"
              icon={<Security />}
              label={<Typography variant="overline">Header</Typography>}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Handle
              id="payload"
              style={{ visibility: "hidden" }}
              type="target"
              position={Position.Left}
            />
            <Handle
              id="payload"
              style={{ visibility: "hidden" }}
              type="source"
              position={Position.Left}
            />
            <Chip
              color="secondary"
              size="small"
              icon={<DataObject />}
              label={<Typography variant="overline">Payload</Typography>}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Handle
              id="secret"
              style={{ visibility: "hidden" }}
              type="target"
              position={Position.Left}
            />
            <Handle
              id="secret"
              style={{ visibility: "hidden" }}
              type="source"
              position={Position.Left}
            />
            <Chip
              color={
                data.mode === "decode" && !data.verify ? "default" : "warning"
              }
              size="small"
              icon={<Key />}
              label={<Typography variant="overline">Secret</Typography>}
            />
          </Box>
        </Stack>
        <CardActions>
          <TextField
            label="JWT Token"
            variant="outlined"
            size="small"
            fullWidth
            disabled={data.mode === "encode"}
            multiline
            rows={5}
            value={data.token}
            onChange={(e) => data.setToken(e.target.value)}
          />
        </CardActions>
      </Stack>
    </Card>
  );
};

export default TokenNode;
