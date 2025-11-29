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
  Typography,
  useTheme,
} from "@mui/material";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import { UtilityProps } from "../types/DrawerTypes";

export const JWTUtility: React.FC<UtilityProps> = ({ setSnackbarConfig }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [decodedPayload, setDecodedPayload] = useState<any | null>(null);
  const [decodedHeader, setDecodedHeader] = useState<any | null>(null);
  const [decodeHeader, setDecodeHeader] = useState(false);
  const theme = useTheme();

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

  const glassStyle = {
    background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    p: 3,
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "monospace",
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
      "& fieldset": {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '1600px', mx: 'auto' }}>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <Paper elevation={0} sx={glassStyle}>
            <Stack spacing={3}>
              <TextField
                minRows={3}
                label="JWT Token"
                variant="outlined"
                fullWidth
                value={token}
                multiline
                onChange={(e) => setToken(e.target.value)}
                sx={inputStyle}
              />
              <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                <Button
                  startIcon={<Token />}
                  variant="contained"
                  onClick={handleDecode}
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
                    fontWeight: 'bold',
                    '&:hover': {
                      boxShadow: `0 6px 20px 0 ${theme.palette.primary.main}60`,
                    }
                  }}
                >
                  Decode Token
                </Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={decodeHeader}
                      onChange={(e) => setDecodeHeader(e.target.checked)}
                      sx={{
                        color: theme.palette.primary.main,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="button" color="text.secondary">
                      Decode Header
                    </Typography>
                  }
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid2>

        {(decodedPayload || decodedHeader) && (
          <>
            {decodedHeader && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Paper elevation={0} sx={{ ...glassStyle, height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold" color="text.secondary">
                      Header
                    </Typography>
                    <Tooltip title="Copy Header">
                      <IconButton
                        onClick={() => handleCopy(JSON.stringify(decodedHeader, null, 2))}
                        size="small"
                        sx={{ color: 'primary.main' }}
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <TextField
                    multiline
                    minRows={10}
                    fullWidth
                    value={JSON.stringify(decodedHeader, null, 2)}
                    sx={inputStyle}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Paper>
              </Grid2>
            )}

            <Grid2 size={{ xs: 12, md: decodedHeader ? 6 : 12 }}>
              <Paper elevation={0} sx={{ ...glassStyle, height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="text.secondary">
                    Payload
                  </Typography>
                  <Tooltip title="Copy Payload">
                    <IconButton
                      onClick={() => handleCopy(JSON.stringify(decodedPayload, null, 2))}
                      size="small"
                      sx={{ color: 'primary.main' }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <TextField
                  multiline
                  minRows={10}
                  fullWidth
                  value={JSON.stringify(decodedPayload, null, 2)}
                  sx={inputStyle}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Paper>
            </Grid2>
          </>
        )}
      </Grid2>
    </Box>
  );
};
