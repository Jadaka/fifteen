export enum ThemeName {
  light,
  dark,
}

export interface Theme {
  surface: string,
  headline: string,
  body: string,
  label: string,
  hint: string,
  hairline: string,
  primary: string,
  secondary: string,
  tertiary: string,
  error: string,
}

const lightTheme: Theme = {
  surface: '#fff',
  headline: '#000',
  body: '#212121',
  label: '#333',
  hint: '#555',
  hairline: '#d0d0d0',
  primary: '#065998',
  secondary: '#069872',
  tertiary: '#ce6e04',
  error: '#c71422',
};

const darkTheme: Theme = {
  surface: '#212121',
  headline: '#fff',
  body: '#eaeaea',
  label: '#cecece',
  hint: '#adadad',
  hairline: '#4e4e4e',
  primary: '#53a0da',
  secondary: '#5cdab9',
  tertiary: '#efb16c',
  error: '#f1505c',
};

const themes = new Map<ThemeName, Theme>([
  [ThemeName.light, lightTheme],
  [ThemeName.dark, darkTheme],
]);

const getTheme = (themeName: ThemeName): Theme => {
  return themes.get(themeName) as Theme;
};

export default getTheme;
