import { DefaultTheme } from 'styled-components';

export interface CustomTheme extends DefaultTheme {
  backgroundColor: string;
  primaryColor: string;
  fontColor: string;
  fontSecondColor: string;
  NavigationFocusButtonColor: string;
  BottomNavigationContainerColor: string;
  BottomNavigationFocusButtonColor: string;
  NavigationBarControlButtonColor: string;
}

export const lightTheme: CustomTheme = {
  backgroundColor: '#F6F6F6',
  primaryColor: '#fff',
  fontColor: '#000',
  fontSecondColor: '#aaa',
  NavigationFocusButtonColor: '#f0f0f0',
  BottomNavigationContainerColor: '#F5F5F5',
  BottomNavigationFocusButtonColor: '#e3e3e3',
  NavigationBarControlButtonColor: '#E8E8E8'
};

export const darkTheme: CustomTheme = {
  backgroundColor: '#242424',
  primaryColor: '#2e2e2e',
  fontColor: '#fff',
  fontSecondColor: '#ccc',
  NavigationFocusButtonColor: '#484848',
  BottomNavigationContainerColor: '#292929',
  BottomNavigationFocusButtonColor: '#383838',
  NavigationBarControlButtonColor: '#2E2E2E'
};