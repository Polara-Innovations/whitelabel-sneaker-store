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
  background: BackgroundColors;
  border: string;
  text: TextColors;
  button: ButtonColors;
  input: InputColors;
}

export interface BackgroundColors {
  color: string;
  alternativeColor: string;
  activeColor: string;
}

export interface TextColors {
  color: string;
  activeColor: string;
  titleColor: string;
  subtitleColor: string;
}

export interface ButtonColors {
  backgroundColor: string;
  textColor: string;
  activeBackgroundColor: string;
  activeTextColor: string;
  borderColor: string;
  alternativeBackgroundColor: string;
  alternativeTextColor: string;
  alternativeactiveBackgroundColor: string;
  alternativeactiveTextColor: string;
  alternativeBorderColor: string;
}

export interface InputColors {
  inputBackgroundColor: string;
  inputTextColor: string;
  inputBorderColor: string;
  inputActiveBorderColor: string;
  inputPlaceholderColor: string;
  inputFocusBackgroundColor: string;
  inputFocusTextColor: string;
  inputFocusBorderColor: string;
  inputErrorBackgroundColor: string;
  inputErrorTextColor: string;
  inputErrorBorderColor: string;
  inputSuccessBackgroundColor: string;
  inputSuccessTextColor: string;
  inputSuccessBorderColor: string;
  inputDisabledBackgroundColor: string;
  inputDisabledTextColor: string;
  inputDisabledBorderColor: string;
}

export interface ThemeConfig {
  id: number;
  type: string;
  global: ColorPalette;
  components: {
    [key: string]: ComponentColors;
  };
}