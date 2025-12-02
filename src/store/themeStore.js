import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',

      setTheme: (theme) => set({ theme }),
      
      setPrimaryColor: (color) => set({ primaryColor: color }),
      
      setSecondaryColor: (color) => set({ secondaryColor: color }),

      setColors: (primary, secondary) => set({ 
        primaryColor: primary, 
        secondaryColor: secondary 
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;