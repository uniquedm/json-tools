import { Lock, LockOpen } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  Node,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css"; // Added this
import { jwtVerify, SignJWT } from "jose";
import { jwtDecode, JwtHeader, JwtPayload } from "jwt-decode";
import React, { useState } from "react";
import HeaderNode from "../components/nodes/HeaderNode";
import PayloadNode from "../components/nodes/PayloadNode";
import SecretKeyNode from "../components/nodes/SecretKeyNode";
import TokenNode from "../components/nodes/TokenNode";
import { UtilityProps } from "../types/DrawerTypes";

// Define the type of mode (encode or decode)
export type JWTEditorMode = "encode" | "decode";

const defaultEdge = {
  style: {
    strokeWidth: 4,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const JWTNodes: React.FC<UtilityProps> = ({ setSnackbarConfig }) => {
  const theme = useTheme();

  // State for toggle: Encode or Decode mode
  const [mode, setMode] = useState<JWTEditorMode>("encode");
  const [header, setHeader] = useState("HS256");
  const [payload, setPayload] = useState(`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`);
  const [verify, toggleVerify] = useState(true);
  const [headerDecode, toggleHeaderDecode] = useState(true);
  const [secret, setSecret] = useState("secret-key");
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Aa6ToaCLTL6EchiSeAQ5hP4bKqLSziGw4V_mdo4CX6A"
  );

  // Handle toggle switch
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? "decode" : "encode");
  };

  // Function to encode the token
  const encodeToken = async () => {
    try {
      const jwt = await new SignJWT(JSON.parse(payload))
        .setProtectedHeader({ alg: header })
        .sign(new TextEncoder().encode(secret));
      setToken(jwt);
      setSnackbarConfig?.({
        open: true,
        severity: "success",
        message: "Encoded!",
        duration: 2000,
      });
    } catch (err) {
      setSnackbarConfig?.({
        open: true,
        severity: "error",
        message: `Error encoding token: ${err}`,
        duration: 4000,
      });
    }
  };

  // Function to decode the token
  const decodeToken = async () => {
    try {
      let message;
      if (!verify) {
        if (headerDecode) {
          const header = jwtDecode<JwtHeader>(token, { header: true });
          setHeader(header.alg as string);
        }
        const payload = jwtDecode<JwtPayload>(token);
        setPayload(JSON.stringify(payload, null, 2));
        message = "Decoded!";
      } else {
        const { payload: decodedPayload, protectedHeader } = await jwtVerify(
          token,
          new TextEncoder().encode(secret)
        );

        setHeader(protectedHeader.alg as string);
        setPayload(JSON.stringify(decodedPayload, null, 2));
        message = "Verified & Decoded!";
      }
      setSnackbarConfig?.({
        open: true,
        severity: "success",
        message: message,
        duration: 2000,
      });
    } catch (err) {
      setSnackbarConfig?.({
        open: true,
        severity: "error",
        message: `Error decoding token: ${err}`,
        duration: 4000,
      });
    }
  };

  // Example positions for the nodes
  const initialNodes: Node[] = [
    {
      id: "header",
      type: "headerNode",
      data: { label: "Header", setHeader, header, mode },
      position: { x: 0, y: 50 },
    },
    {
      id: "payload",
      type: "payloadNode",
      data: { label: "Payload", setPayload, payload, mode },
      position: { x: -350, y: 90 },
    },
    {
      id: "secret",
      type: "secretNode",
      data: { label: "Secret", setSecret, secret, mode },
      position: { x: -100, y: 350 },
    },
    {
      id: "token",
      type: "tokenNode",
      data: { label: "Token", setToken, token, mode, verify, headerDecode },
      position: { x: 300, y: 200 },
    },
  ];

  const secretRequired = verify
    ? [
        {
          id: "secret-token",
          source: "secret",
          target: "token",
          animated: true,
          ...defaultEdge,
          targetHandle: "secret",
        },
      ]
    : [];

  const headerRequired = headerDecode
    ? [
        {
          id: "token-header",
          source: "token",
          target: "header",
          label: "base64UrlDecode",
          animated: true,
          ...defaultEdge,
          sourceHandle: "header",
        },
      ]
    : [];

  // Conditional edges depending on the mode (encode or decode)
  const initialEdges: Edge[] =
    mode === "encode"
      ? [
          {
            id: "header-token",
            source: "header",
            target: "token",
            animated: true,
            label: "base64UrlEncode",
            ...defaultEdge,
            targetHandle: "header",
          },
          {
            id: "payload-token",
            source: "payload",
            target: "token",
            label: "base64UrlEncode",
            animated: true,
            ...defaultEdge,
            targetHandle: "payload",
          },
          {
            id: "secret-token",
            source: "secret",
            target: "token",
            animated: true,
            ...defaultEdge,
            targetHandle: "secret",
          },
        ]
      : [
          ...headerRequired,
          {
            id: "token-payload",
            source: "token",
            target: "payload",
            label: "base64UrlDecode",
            animated: true,
            ...defaultEdge,
            sourceHandle: "payload",
          },
          ...secretRequired,
        ];
  return (
    <Box sx={{ mt: 6 }} style={{ height: "85vh", width: "100%" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={{
          headerNode: HeaderNode,
          payloadNode: PayloadNode,
          secretNode: SecretKeyNode,
          tokenNode: TokenNode,
        }}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        colorMode={theme.palette.mode}
        fitView
      >
        <Panel position={"top-right"}>
          <Paper elevation={4} sx={{ borderRadius: 1, p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="button">Encode</Typography>
              <Switch
                checked={mode === "decode"}
                onChange={handleToggle}
                inputProps={{ "aria-label": "Encode/Decode Toggle" }}
              />
              <Typography variant="button">Decode</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              {mode === "encode" ? (
                <Button
                  startIcon={<Lock />}
                  variant="contained"
                  fullWidth
                  onClick={encodeToken}
                >
                  Encode
                </Button>
              ) : (
                <Stack>
                  <Button
                    startIcon={<LockOpen />}
                    variant="contained"
                    fullWidth
                    onClick={decodeToken}
                  >
                    Decode
                  </Button>
                  <Stack direction={"row"}>
                    <FormControlLabel
                      label={<Typography variant="overline">Header</Typography>}
                      control={
                        <Checkbox
                          size="small"
                          checked={headerDecode}
                          onChange={(e) => toggleHeaderDecode(e.target.checked)}
                          aria-label="Verify Token?"
                        />
                      }
                    />
                    <FormControlLabel
                      label={<Typography variant="overline">Verify</Typography>}
                      control={
                        <Checkbox
                          size="small"
                          checked={verify}
                          onChange={(e) => toggleVerify(e.target.checked)}
                          aria-label="Verify Token?"
                        />
                      }
                    />
                  </Stack>
                </Stack>
              )}
            </Box>
          </Paper>
        </Panel>
        <Panel position={"bottom-right"}>
          <Typography
            sx={{ color: alpha(theme.palette.text.primary, 0.1) }}
            variant="button"
            fontSize={56}
          >
            {mode}
          </Typography>
        </Panel>
        <Background
          gap={12}
          lineWidth={0.1}
          variant={BackgroundVariant.Lines}
        />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
export default JWTNodes;
