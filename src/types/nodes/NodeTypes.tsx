import { JWTEditorMode } from "../../pages/JWTNodes";

export type HeaderNodeData = {
  setHeader: (value: string) => void;
  header: string;
  mode: JWTEditorMode;
};

export type PayloadNodeData = {
  setPayload: (value: string) => void;
  payload: string;
  mode: JWTEditorMode;
};

export type SecretNodeData = {
  setSecret: (value: string) => void;
  secret: string;
  mode: JWTEditorMode;
};

export type TokenNodeData = {
  setToken: (value: string) => void;
  token: string;
  mode: JWTEditorMode;
  verify: boolean;
  headerDecode: boolean;
};
