import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { OrderListView } from 'src/layouts/components/v2bcards/order/view';
import { BlankView } from 'src/sections/blank/view';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">

        <OrderListView />
        </DashboardContent>
    </>
  );
}

