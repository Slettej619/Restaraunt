import burgerTheme from '../../themes/bistro_burger.json';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export interface ThemeTypography {
  font_family_heading: string;
  font_family_body: string;
  scale_ratio: number;
}

export interface ThemeUX {
  glassmorphism: string;
  border_radius: string;
  shadow_depth: string;
}

export interface BrandIdentity {
  name: string;
  tagline: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  ux_tokens: ThemeUX;
}

export interface ThemeManifest {
  theme_id: string;
  meta: {
    version: string;
    created_at: string;
  };
  brand_identity: BrandIdentity;
  assets: {
    base_path: string;
    mappings: Record<string, string>;
  };
  modules: Record<string, boolean>;
}

// In a real implementation, this would fetch from Firestore based on the hostname or a config.
export async function loadTheme(themeId: string = 'bistro_burger'): Promise<ThemeManifest> {
  // Simulate async load
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real dynamic system we might load different files
      resolve(burgerTheme as ThemeManifest);
    }, 100);
  });
}
