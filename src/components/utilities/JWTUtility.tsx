import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  TextField,
} from "@mui/material";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";
import { UtilityProps } from "../../data/DrawerData";

export const JWTUtility: React.FC<UtilityProps> = () => {
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
    } catch (error) {
      console.error("Invalid token");
      setDecodedPayload(null); // Reset if invalid token
      setDecodedHeader(null); // Reset header on error
    }
  };

  return (
    <Box
      margin={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Grid2 container spacing={4}>
        <Grid2 size={6}>
          <TextField
            label="JWT Token"
            variant="outlined"
            fullWidth
            value={token}
            multiline
            onChange={(e) => setToken(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={decodeHeader}
                onChange={(e) => setDecodeHeader(e.target.checked)}
              />
            }
            label="Decode JWT Header"
          />

          <Button variant="contained" onClick={handleDecode}>
            Decode Token
          </Button>
        </Grid2>
        <Grid2 size={6}>
          {decodedHeader && (
            <Box width="100%" mb={2}>
              <TextField
                id="outlined-textarea"
                label="Decoded Header"
                multiline
                disabled
                value={JSON.stringify(decodedHeader, null, 2)}
              />
            </Box>
          )}

          {decodedPayload && (
            <Box width="100%">
              <TextField
                id="outlined-textarea"
                label="Decoded Payload"
                multiline
                disabled
                value={JSON.stringify(decodedPayload, null, 2)}
              />
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};
