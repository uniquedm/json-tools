import { createTheme, Theme } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';

export interface ThemeInput {
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});