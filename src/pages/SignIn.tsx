import { Helmet } from 'react-helmet';

const SignIn = () => {
  const pageTitle = 'Sign In';

 return (
   <div>
     <Helmet>
       <title>{pageTitle}</title>
     </Helmet>
     Sign in
   </div>
 )
}

export default SignIn