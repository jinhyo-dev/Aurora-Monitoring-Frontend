import { darkTheme } from './styles/theme/defaultTheme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from "./styles/GlobalStyle"

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
  const theme = darkTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme}/>
      {children}
    </ThemeProvider>
  )
}

export default Providers