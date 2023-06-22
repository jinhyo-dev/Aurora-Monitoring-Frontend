import styled from "styled-components";

interface PageNameProps {
  name: string;
}

const PageName:React.FC<PageNameProps> = ({name}) => {
  return (
    <TopPageName>
      {name}
    </TopPageName>
  )
}

const TopPageName = styled.div`
  margin: 1% 0 auto 1%;
  height: 2.8rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${({theme}) => theme.fontColor};
`

export default PageName