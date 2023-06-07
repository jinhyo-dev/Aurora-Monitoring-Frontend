import { DefaultTheme } from 'styled-components';

export interface CustomTheme extends DefaultTheme {
  backgroundColor: string;
  primaryColor: string;
}

export const lightTheme: CustomTheme = {
  backgroundColor: '#fff',
  primaryColor: '#aaa'
};

export const darkTheme: CustomTheme = {
  backgroundColor: '#242424',
  primaryColor: '#2e2e2e'
};