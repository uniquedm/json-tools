import { ContentCopy, Token } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import { UtilityProps } from "../../data/DrawerData";

export const JWTUtility: React.FC<UtilityProps> = ({ setSnackbarConfig }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [decodedPayload, setDecodedPayload] = useState<any | null>(null);
  const [decodedHeader, setDecodedHeader] = useState<any | null>(null);
  const [decodeHeader, setDecodeHeader] = useState(false);

  const handleDecode = () => {
    try {
      // If decodeHeader is checked, decode the header and payload
      if (decodeHeader) {
        const header = jwtDecode<JwtPayload>(token, { header: true });
        setDecodedHeader(header);
      } else {
        setDecodedHeader(null); // Reset header if not checked
      }

      const payload = jwtDecode<JwtPayload>(token);
      setDecodedPayload(payload);
      setSnackbarConfig?.({
        open: true,
        severity: "success",
        message: "Decoded!",
        duration: 2000,
      });
    } catch (error) {
      setSnackbarConfig?.({
        open: true,
        severity: "error",
        message: "Invalid Token",
        duration: 2000,
      });
      setDecodedPayload(null); // Reset if invalid token
      setDecodedHeader(null); // Reset header on error
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setSnackbarConfig?.({
          open: true,
          severity: "success",
          message: "Copied to clipboard!",
          duration: 2000,
        });
      },
      (err) => {
        setSnackbarConfig?.({
          open: true,
          severity: "error",
          message: `Failed to copy text: "${err}`,
          duration: 6000,
        });
      }
    );
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Paper elevation={4} sx={{ p: 2, m: 4 }}>
        <Grid2 container sx={{ mt: 2 }} spacing={4}>
          <Grid2 size={12}>
            <Stack spacing={2}>
              <TextField
                minRows={3}
                label="JWT Token"
                variant="outlined"
                fullWidth
                value={token}
                multiline
                onChange={(e) => setToken(e.target.value)}
              />
              <Stack direction={"row"}>
                <Button
                  startIcon={<Token />}
                  variant="outlined"
                  onClick={handleDecode}
                >
                  Decode Token
                </Button>
                <Box sx={{ ml: "auto" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={decodeHeader}
                        onChange={(e) => setDecodeHeader(e.target.checked)}
                      />
                    }
                    label="Decode JWT Header"
                  />
                </Box>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={6}>
            {decodedPayload && (
              <Box sx={{ position: "relative" }}>
                <TextField
                  id="outlined-textarea"
                  label="Decoded Payload"
                  multiline
                  minRows={10}
                  value={JSON.stringify(decodedPayload, null, 2)}
                  sx={{ width: "50vh" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <Tooltip title="Copy Content">
                  <IconButton
                    onClick={() =>
                      handleCopy(JSON.stringify(decodedPayload, null, 2))
                    }
                    sx={{ position: "absolute" }}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Grid2>
          <Grid2 size={6}>
            {decodedHeader && (
              <Box sx={{ position: "relative" }}>
                <TextField
                  id="outlined-textarea"
                  label="Decoded Header"
                  multiline
                  minRows={10}
                  value={JSON.stringify(decodedHeader, null, 2)}
                  sx={{ width: "50vh" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <Tooltip title="Copy Content">
                  <IconButton
                    onClick={() =>
                      handleCopy(JSON.stringify(decodedHeader, null, 2))
                    }
                    sx={{ position: "absolute" }}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
};
