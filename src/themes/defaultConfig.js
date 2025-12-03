import classicTheme from './classic';
import modernTheme from './modern';
import minimalTheme from './minimal';

export const themes = {
  classic: classicTheme,
  modern: modernTheme,
  minimal: minimalTheme,
};

export const defaultTheme = classicTheme;

export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply typography
  root.style.setProperty('--font-family', theme.typography.fontFamily);

  // Apply spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
};

export default {
  themes,
  defaultTheme,
  applyTheme,
};