export interface Spacing {
    xSmall: string;
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  }

  export interface FontSize {
    xSmall: string;
    small: string;
    medium: string;
    large: string;
    xLarge: string;
    xxLarge: string;
  }

  export interface FontWeight {
    light: string;
    regular: string;
    bold: string;
  }

  export interface Font {
    family: string;
    size: FontSize;
    weight: FontWeight;
  }
  
  export interface BorderRadius {
    xSmall: string;
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  }
  
export interface BoxShadow {
    card: string;
    menu: string;
    modal: string;
    button: string;
    tooltip: string;
    default: string;
    hover: string;
    active: string;
    inset: string;
    custom: string;
}
  
  export interface Margin {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  }
  
  export interface Padding {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  }
  
  export interface Animation {
    duration: {
      short: string;
      medium: string;
      long: string;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  }
  
  export interface IconSize {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  }
  
  export interface Opacity {
    low: string;
    medium: string;
    high: string;
  }
  
  export interface LayoutConfig {
    spacing: Spacing;
    font: Font;
    borderRadius: BorderRadius;
    boxShadow: BoxShadow; 
    margin: Margin
    padding: Padding; 
    animation: Animation;
    iconSize: IconSize;
    opacity: Opacity;
  }