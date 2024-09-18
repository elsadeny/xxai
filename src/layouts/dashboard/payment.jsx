import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';

import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { fYuan} from 'src/utils/format-number';

import { useNavigate, useLocation } from 'react-router-dom';

import { DashboardContent } from 'src/layouts/dashboard';
import { PayCircleView } from '../components/v2bcards/pay-cirle';
import { OrderCreateCard } from '../components/v2bcards/order_create_card';



const metadata = { title: `payment - ${CONFIG.appName}`};

export default function Page() {
  const location = useLocation();
  const { plan } = location.state || {};
  const [selectedRow, setSelectedRow] = useState(0);

  const rows = [
      { label: 'Monthly', value: plan?.month_price , cycle:'month_price'},
      { label: 'Quarterly', value: plan?.quarter_price, cycle:'quarter_price' },
      { label: 'Semi Annually', value: plan?.half_year_price, cycle:'half_year_price'},
      { label: 'Annually', value: plan?.year_price, cycle:'year_price' },
  ];

  const handleRowSelection = (index) => {
      setSelectedRow(index);
  };

  const selectedRowData = rows[selectedRow] || {}; // Get selected row data

  console.log("Selected Row Data: ", selectedRowData); // Debugging log
  console.log("Plan: ", plan); // Debugging log

  const name = `${plan.name} x ${selectedRowData.label}`;

  return (
      <>
          <Helmet>
              <title>{metadata.title}</title>
          </Helmet>

          <DashboardContent maxWidth="xl">
              <Grid container spacing={3}>
                  <Grid item xs={6} md={4} key={plan?.id}>
                      <PayCircleView
                          name={plan?.name}
                          rows={rows}
                          selectedRow={selectedRow}
                          onRowSelect={handleRowSelection}
                      />
                  </Grid>

                  <Grid item xs={6} md={4} key={plan?.id}>
                      <OrderCreateCard
                          plan={plan}
                          cycle={selectedRowData.cycle}
                          price={fYuan(selectedRowData.value) || "$0"}
                          title={`Total\n`}
                          name={ name }
                      />
                  </Grid>
              </Grid>
          </DashboardContent>
      </>
  );
}