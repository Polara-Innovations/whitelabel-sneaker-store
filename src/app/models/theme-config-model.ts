export interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  quinary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ComponentColors {
  background: string;
  alternativeBackground: string;
  text: string;
  textActive: string;
  border: string;
  backgroundActive: string;
  title: string;
  subtitle: string;
  buttonBackground: string;
  buttonText: string;
  buttonactiveBackground: string;
  buttonactiveText: string;
  buttonBorder: string;
  buttonAlternativeBackground: string;
  buttonAlternativeText: string;
  buttonAlternativeactiveBackground: string;
  buttonAlternativeactiveText: string;
  buttonAlternativeBorder: string;
}

export interface ThemeConfig {
  id: number;
  type: string;
  global: ColorPalette;
  components: {
    [key: string]: ComponentColors;
  };
}