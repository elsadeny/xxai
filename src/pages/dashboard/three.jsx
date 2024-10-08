import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { SimpleOrderTable } from 'src/layouts/components/v2bcards/order/view/simple-order';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.appName}` };


export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent>
      <SimpleOrderTable />
      </DashboardContent>
    </>
  );
}


