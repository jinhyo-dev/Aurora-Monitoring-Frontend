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
  AlertOverlayColor: string;
  boxShadow: string;
}

export const lightTheme: CustomTheme = {
  backgroundColor: '#F6F6F6',
  primaryColor: '#fff',
  fontColor: '#000',
  fontSecondColor: '#888',
  NavigationFocusButtonColor: '#e1e1e1',
  BottomNavigationContainerColor: '#F5F5F5',
  BottomNavigationFocusButtonColor: '#e3e3e3',
  NavigationBarControlButtonColor: '#E8E8E8',
  AlertOverlayColor: '#333',
  boxShadow: 'rgba(50, 50, 105, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px'
};

export const darkTheme: CustomTheme = {
  backgroundColor: '#242424',
  primaryColor: '#2e2e2e',
  fontColor: '#fff',
  fontSecondColor: '#999',
  NavigationFocusButtonColor: '#484848',
  BottomNavigationContainerColor: '#292929',
  BottomNavigationFocusButtonColor: '#383838',
  NavigationBarControlButtonColor: '#2E2E2E',
  AlertOverlayColor: '#eee',
  boxShadow: '0px 2px 2px 0px hsla(0, 0%, 0%, 0.14), 0px 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0px 1px 5px 0px hsla(0, 0%, 0%, 0.2)'
};