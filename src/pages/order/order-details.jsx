import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { EmptyContent } from 'src/layouts/components/empty-content';

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

        <EmptyContent />
      
      </DashboardContent>
    </>
  );
}


