import { customTheme as aruba } from '../themes/aruba';
import { customTheme as hpe } from '../themes/hpe';
import { customTheme as materialDark } from '../themes/materialDark';
import { customTheme as materialLight } from '../themes/materialLight';
import { customTheme as metroTheme } from '../themes/metro';
import { customTheme as purpleTheme } from '../themes/purpleTheme';
import create from 'zustand';

type Theme = any;

interface ThemeObj {
  name: string;
  theme: Theme;
}

interface ThemeModeState {
  dark: boolean;
  setMode: (dark: boolean) => void;
  getMainBackground: () => string;
}

export const useThemeMode = create<ThemeModeState>((set, get) => ({
  dark: true,
  setMode: (dark) => {
    set({ dark });
  },
  getMainBackground: () => (get().dark ? 'dark-1' : 'light-1'),
}));

interface ThemeingState {
  themes: ThemeObj[];
  selectedTheme: ThemeObj;
  setSelectedTheme: (t: ThemeObj) => void;
}

export const useThemeing = create<ThemeingState>((set) => ({
  themes: [
    {
      name: 'Pink',
      theme: purpleTheme,
    },
    {
      name: 'Ligth',
      theme: materialLight,
    },
    {
      name: 'Dark',
      theme: materialDark,
    },
    {
      name: 'Metro',
      theme: metroTheme,
    },
    {
      name: 'Aruba',
      theme: aruba,
    },
    {
      name: 'Hpe',
      theme: hpe,
    },
  ],
  selectedTheme: {
    name: 'pink',
    theme: purpleTheme,
  },
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
}));