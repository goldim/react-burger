import { Link } from 'react-router-dom'
import PageWithAppHeader from '../components/page-with-app-header';

const Page404 = () => (
  <PageWithAppHeader>
    <div>
      <h1>Oops! 404 Error</h1>
      <p>The page you requested does not exist</p>
      <br />
      <br />
      <p>check the address or try <Link to='/'>homepage</Link></p>
    </div>
  </PageWithAppHeader>
);


export default Page404;