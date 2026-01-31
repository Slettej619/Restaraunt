import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeManifest, loadTheme } from '../lib/manifest';

interface ThemeContextType {
  theme: ThemeManifest | null;
  loading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  loading: true,
  refreshTheme: async () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeManifest | null>(null);
  const [loading, setLoading] = useState(true);

  const applyThemeVariables = (manifest: ThemeManifest) => {
    const root = document.documentElement;
    const { colors, typography, ux_tokens } = manifest.brand_identity;

    // Colors
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);

    // Typography
    root.style.setProperty('--font-heading', typography.font_family_heading);
    root.style.setProperty('--font-body', typography.font_family_body);

    // UX
    root.style.setProperty('--border-radius', ux_tokens.border_radius);
    // Logic for glassmorphism levels could go here
  };

  const refreshTheme = async () => {
    setLoading(true);
    try {
      const manifest = await loadTheme();
      setTheme(manifest);
      if (typeof window !== 'undefined') {
        applyThemeVariables(manifest);
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, loading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
