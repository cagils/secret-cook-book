/* eslint-disable max-len */
import { extendTheme, ThemeDirection, withDefaultColorScheme, type ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

// ORIGINAL THEME STYLES FOR REFERENCE STARTS HERE

const semanticTokens = {
  colors: {
    'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.900' },
    'chakra-body-bg': { _light: 'white', _dark: 'gray.800' },
    'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.300' },
    'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.400' },
  },
};

const direction: ThemeDirection = 'ltr';

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

const blur = {
  none: 0,
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#FFFFFF',

  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },

  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },

  red: {
    50: '#FFF5F5',
    100: '#FED7D7',
    200: '#FEB2B2',
    300: '#FC8181',
    400: '#F56565',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#822727',
    900: '#63171B',
  },

  orange: {
    50: '#FFFAF0',
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19',
  },

  yellow: {
    50: '#FFFFF0',
    100: '#FEFCBF',
    200: '#FAF089',
    300: '#F6E05E',
    400: '#ECC94B',
    500: '#D69E2E',
    600: '#B7791F',
    700: '#975A16',
    800: '#744210',
    900: '#5F370E',
  },

  green: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },

  teal: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },

  blue: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1A365D',
  },

  cyan: {
    50: '#EDFDFD',
    100: '#C4F1F9',
    200: '#9DECF9',
    300: '#76E4F7',
    400: '#0BC5EA',
    500: '#00B5D8',
    600: '#00A3C4',
    700: '#0987A0',
    800: '#086F83',
    900: '#065666',
  },

  purple: {
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659',
  },

  pink: {
    50: '#FFF5F7',
    100: '#FED7E2',
    200: '#FBB6CE',
    300: '#F687B3',
    400: '#ED64A6',
    500: '#D53F8C',
    600: '#B83280',
    700: '#97266D',
    800: '#702459',
    900: '#521B41',
  },

  linkedin: {
    50: '#E8F4F9',
    100: '#CFEDFB',
    200: '#9BDAF3',
    300: '#68C7EC',
    400: '#34B3E4',
    500: '#00A0DC',
    600: '#008CC9',
    700: '#0077B5',
    800: '#005E93',
    900: '#004471',
  },

  facebook: {
    50: '#E8F4F9',
    100: '#D9DEE9',
    200: '#B7C2DA',
    300: '#6482C0',
    400: '#4267B2',
    500: '#385898',
    600: '#314E89',
    700: '#29487D',
    800: '#223B67',
    900: '#1E355B',
  },

  messenger: {
    50: '#D0E6FF',
    100: '#B9DAFF',
    200: '#A2CDFF',
    300: '#7AB8FF',
    400: '#2E90FF',
    500: '#0078FF',
    600: '#0063D1',
    700: '#0052AC',
    800: '#003C7E',
    900: '#002C5C',
  },

  whatsapp: {
    50: '#dffeec',
    100: '#b9f5d0',
    200: '#90edb3',
    300: '#65e495',
    400: '#3cdd78',
    500: '#22c35e',
    600: '#179848',
    700: '#0c6c33',
    800: '#01421c',
    900: '#001803',
  },

  twitter: {
    50: '#E5F4FD',
    100: '#C8E9FB',
    200: '#A8DCFA',
    300: '#83CDF7',
    400: '#57BBF5',
    500: '#1DA1F2',
    600: '#1A94DA',
    700: '#1681BF',
    800: '#136B9E',
    900: '#0D4D71',
  },

  telegram: {
    50: '#E3F2F9',
    100: '#C5E4F3',
    200: '#A2D4EC',
    300: '#7AC1E4',
    400: '#47A9DA',
    500: '#0088CC',
    600: '#007AB8',
    700: '#006BA1',
    800: '#005885',
    900: '#003F5E',
  },
};

const typography = {
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
    '3': '.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  },

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
};

const largeSizes = {
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  '8xl': '90rem',
};

const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

const spacing = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

const sizes = {
  ...spacing,
  ...largeSizes,
  container,
};

const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  none: 'none',
  'dark-lg': 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
};

const borders = {
  none: 0,
  '1px': '1px solid',
  '2px': '2px solid',
  '4px': '4px solid',
  '8px': '8px solid',
};

const transitionProperty = {
  common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  dimensions: 'width, height',
  position: 'left, right, top, bottom',
  background: 'background-color, background-image, background-position',
};

const transitionTimingFunction = {
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const transitionDuration = {
  'ultra-fast': '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  'ultra-slow': '500ms',
};

const transition = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration,
};

const foundations = {
  breakpoints,
  zIndices,
  radii,
  blur,
  colors,
  ...typography,
  sizes,
  shadows,
  space: spacing,
  borders,
  transition,
};

const components = {
  // CHECK: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/index.ts
};

const styles = {
  global: {
    body: {
      fontFamily: 'body',
      color: 'chakra-body-text',
      bg: 'chakra-body-bg',
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      lineHeight: '1.2',
    },
    '*::placeholder': {
      color: 'chakra-placeholder-color',
    },
    '*, *::before, &::after': {
      borderColor: 'chakra-border-color',
      wordWrap: 'break-word',
    },
  },
};

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra',
};

const originalTheme = {
  semanticTokens,
  direction,
  ...foundations,
  components,
  styles,
  config,
};

// CUSTOM STYLES START HERE
const moder = (prop: string, light: string, dark: string) => ({
  [prop]: light,
  '.chakra-ui-dark &': { [prop]: dark },
});

const customColors = {};
const customFonts = {
  /* 
  "Nunito"
  "Quicksand"
  "Big Shoulders Display"
  "Baloo Thambi 2"
  "Sansita Swashed"
  "PT Sans Caption"
  "Caveat"
  "Caveat Brush"
  */
  fPrimary: ``,
  fSecondary: ``,
  fBigHeading: `"Sansita Swashed"`,
  fHeading: `"Caveat"`,
  fText: `"Nunito"`,
  fQuote: `"Nunito"`,
  fIngredients: `"Nunito"`,
  fMono: ``,
};
const customStyles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('gray.50', 'gray.900')(props),
    },
    '*:focus, *[data-focus]': {
      // border: 'none !important',
      // outline: 'none !important',
      boxShadow: 'none !important',
    },
    '*:focus-visible, *[data-focus-visible]': {
      // border: 'none !important',
      // outline: 'none !important',
      // boxShadow: 'none !important',
      // borderBottom: '1px solid red !important',
      //
      boxShadow: '0 0 0 2px var(--chakra-colors-pink-100),    0 0 2px 3px var(--chakra-colors-pink-400) !important',
      outline: '2px solid transparent !important',
      outlineOffset: '2px !important',
    },
  }),
};

const layerStyles = {
  dirty: {
    ...moder('color', 'pink.600', 'pink.600'),
  },
};

const textStyles = {
  primary: {
    fontFamily: customFonts.fPrimary,
  },
  secondary: {
    fontFamily: customFonts.fSecondary,
  },
};

const themeExtensions = {
  semanticTokens: {},
  direction: {},
  // foundations start
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
    '3xl': '120em',
    '4xl': '150em',
    '5xl': '180em',
  },
  zIndices: {},
  radii: {},
  blur: {},
  colors: customColors,
  // typography start
  letterSpacings: {},
  lineHeights: {},
  fontWeights: {},
  fonts: {
    title: `${customFonts.fBigHeading}, ` + typography.fonts.heading,
    heading: `${customFonts.fHeading}, ` + typography.fonts.heading,
    quote: `${customFonts.fQuote}` + typography.fonts.body,
    body: `${customFonts.fText}, ` + typography.fonts.body,
    ingredients: `${customFonts.fIngredients}, ` + typography.fonts.heading,
    mono: `${customFonts.fMono}` + typography.fonts.mono,
  },
  fontSizes: {},
  // typography end
  sizes: {},
  shadows: {
    // ...foundations.shadows,
    baseWhite: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
    innerWhite: 'inset 0 2px 10px 0px rgba(255,255,255,0.06)',
  },
  space: {},
  borders: {},
  transition: {},
  // foundations end
  components: {
    Heading: {
      variants: {
        big: {
          fontFamily: `${customFonts.fBigHeading}, ` + typography.fonts.heading,
        },
      },
    },
    Button: {
      baseStyle: {
        lineHeight: 'typography.lineHeights.normal',
      },
    },
  },
  styles: customStyles,
  config: {},
  layerStyles,
  textStyles,
};

const customTheme = extendTheme(
  themeExtensions,
  withDefaultColorScheme({
    colorScheme: 'pink',
  })
);

export { customTheme, originalTheme };
