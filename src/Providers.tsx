import { darkTheme, lightTheme } from './styles/theme/defaultTheme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from "./styles/GlobalStyle"
import { useCookies } from "react-cookie";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
  const [cookie] = useCookies()
  const theme = cookie.theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme}/>
      {children}
    </ThemeProvider>
  )
}

export default Providers