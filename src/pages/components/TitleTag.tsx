import { Helmet, HelmetProvider } from "react-helmet-async";
import * as React from "react";

interface TitleProps {
  title: string
}

const TitleTag: React.FC<TitleProps> = ({title}) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title + ' · Aurora'}</title>
        </Helmet>
      </HelmetProvider>
    </>
  )
}

export default TitleTag