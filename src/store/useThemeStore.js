import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyTheme = isDark => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useThemeStore = create(
  persist((set, get) => ({
    isDarkMode: false,

    toggleMode: () => {
      set(state => {
        const newMode = !state.isDarkMode;
        applyTheme(newMode);
        return { isDarkMode: newMode };
      });
    }
  }),{
    name: 'theme-storage',
    partialize: (state) => ({ isDarkMode: state.isDarkMode }),

    onRehydrateStorage: () => (state) => {      
        if (state) {
          applyTheme(state.isDarkMode);
        }
      },
  }
));
