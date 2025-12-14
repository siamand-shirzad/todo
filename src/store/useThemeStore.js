import { create } from 'zustand';

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useThemeStore = create((set, get) => ({
  isDarkMode: false, // حالت اولیه light

  toggleMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      applyTheme(newMode);
      return { isDarkMode: newMode };
    });
  },
}));
