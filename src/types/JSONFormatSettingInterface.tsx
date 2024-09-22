export interface JSONFormatterSettings {
  isLabeled: boolean | undefined;
  handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  flattenSafe: boolean | undefined;
  handleFlattenSafe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  flattenDepth: number | undefined;
  handleDepthChange: (event: { target: { value: any } }) => void;
  flattenDelimiter: string | undefined;
  handleDelimiterChange: (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => void;
  unflattenOverwrite: boolean | undefined;
  handleUnflattenOverwrite: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  unflattenObject: boolean | undefined;
  handleUnflattenObject: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editorMinimap: boolean | undefined;
  handleEditorMinimap: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
