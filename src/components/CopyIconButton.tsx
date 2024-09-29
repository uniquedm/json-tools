import { ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface CopyIconButtonProps {
  textToCopy: string; // Define the type for textToCopy
  tooltip: string;
}

export const CopyIconButton: React.FC<CopyIconButtonProps> = ({
  textToCopy,
  tooltip,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton size="small" onClick={() => handleCopy(textToCopy)}>
        <ContentCopy />
      </IconButton>
    </Tooltip>
  );
};
