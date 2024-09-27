import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { EmptyContent } from 'src/layouts/components/empty-content';

import { DashboardContent } from 'src/layouts/dashboard';
import ProductOrderPage from './order-view';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.appName}` };


export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent>

        <ProductOrderPage />
      
      </DashboardContent>
    </>
  );
}


