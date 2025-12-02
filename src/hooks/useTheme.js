import useThemeStore from '../store/themeStore';

const useTheme = () => {
  const { theme, primaryColor, secondaryColor, setTheme, setPrimaryColor, setSecondaryColor, setColors } = useThemeStore();

  const applyTheme = () => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.style.setProperty('--color-secondary', secondaryColor);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  return {
    theme,
    primaryColor,
    secondaryColor,
    setTheme,
    setPrimaryColor,
    setSecondaryColor,
    setColors,
    applyTheme,
  };
};

export default useTheme;