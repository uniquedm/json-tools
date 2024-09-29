import { DataObject, DocumentScanner, Edit } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  Stack,
  useTheme,
} from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { ScrollableTextField } from "../../data/MUIStyles";
import { glowingCardStyle, nodeTitleChipStyle } from "../../data/NodeStyle";
import { PayloadNodeData } from "../../types/nodes/NodeTypes";
import { CopyIconButton } from "../CopyIconButton";
import { EditorDialog } from "../dialogs/EditorDialog";

// Define PayloadNode component and type for props
interface PayloadNodeProps {
  data: PayloadNodeData; // Type for the data prop
}

const PayloadNode: React.FC<PayloadNodeProps> = ({ data }) => {
  const theme = useTheme(); // Access the theme
  const [openEditorDialog, toggleEditorDialog] = useState(false);
  const handleDialogClose = () => {
    toggleEditorDialog(false);
  };
  return (
    <Card
      sx={glowingCardStyle(
        theme.palette.secondary.main,
        theme.palette.secondary.main
      )}
      variant="elevation"
    >
      {nodeTitleChipStyle("Payload", <DataObject />, "secondary")}
      <CopyIconButton textToCopy={data.payload} tooltip="Copy Payload" />
      <EditorDialog
        open={openEditorDialog}
        handleClose={handleDialogClose}
        title="Payload"
        content={data.payload}
        setContent={data.setPayload}
        readOnly={data.mode === "decode"}
      />
      <CardActions>
        <Stack sx={{ alignItems: "center" }}>
          <ScrollableTextField
            label="Payload"
            variant="outlined"
            size="small"
            multiline
            value={data.payload}
            disabled
            onChange={(e) => data.setPayload(e.target.value)} // Use the setPayload function from data
          />
          <ButtonGroup variant="text" color="secondary" size="small">
            {data.mode === "decode" ? (
              <Button
                onClick={() => toggleEditorDialog(true)}
                startIcon={<DocumentScanner />}
              >
                Show
              </Button>
            ) : (
              <Button
                onClick={() => toggleEditorDialog(true)}
                startIcon={<Edit />}
              >
                Edit
              </Button>
            )}
          </ButtonGroup>
        </Stack>
      </CardActions>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Right} />
    </Card>
  );
};

export default PayloadNode;
