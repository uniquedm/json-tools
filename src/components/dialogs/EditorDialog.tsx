import { Editor } from "@monaco-editor/react";
import CloseIcon from "@mui/icons-material/Close";
import { Skeleton, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { BlurredBackdrop } from "../../data/MUIStyles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    display: "flex",
    overflowX: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    minWidth: "400px",
    width: "50vw",
    maxWidth: "50vw",
    overflowX: "hidden",
  },
}));

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  setContent: any;
  readOnly?: boolean;
}

export const EditorDialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  title,
  content,
  setContent,
  readOnly = false,
}) => {
  const [editorContent, setEditorContent] = useState<string | undefined>(
    content
  );
  useEffect(() => {
    setEditorContent(content);
  }, [open]);

  const dialogTitle = title;
  const theme = useTheme();
  const monacoTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";

  const handleSave = () => {
    if (!editorContent) {
      alert("Payload must be a valid JSON!");
      return;
    }
    try {
      if (editorContent) JSON.parse(editorContent);
      setContent(editorContent);
      handleClose();
    } catch (err) {
      alert(`Invalid JSON: ${err}`);
    }
  };

  const handleCancel = () => {
    setEditorContent(content);
    handleClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCancel}
        aria-labelledby="customized-dialog-title"
        open={open}
        slots={{
          backdrop: BlurredBackdrop,
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="button" fontSize={18}>
            {dialogTitle}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Editor
            theme={monacoTheme}
            value={editorContent}
            onChange={(value, _ev) => setEditorContent(value)}
            height={"50vh"}
            defaultLanguage="json"
            options={{
              readOnly: readOnly,
            }}
            loading={<Skeleton variant="rounded" animation="wave" />}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleSave}>
            {readOnly ? "Close" : "Update"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};
