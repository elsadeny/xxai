import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';



import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { PlanWidgetCard } from '../../layouts/components/v2bcards/plan-card';

const metadata = { title: `购买| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch('https://xx-ai.uk/api/v1/user/plan/fetch', {
          method: 'GET',
          headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDM3Niwic2Vzc2lvbiI6ImRmODAxNTI3MDA4YWU3NzNjMTRkNTYwZWE0ZGRjMmNmIn0.hpQy9BFt792hkIbm5J16IKLhl6TSPhxPTmfYvdXo4Fw', // Use the same token from curl
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok. Status: ${response.status}, ${response.statusText}. Response: ${errorText}`);
        }
        
        const data = await response.json();
        setPlans(data.data);
      } catch (error) {
        setFetchError(`An unexpected error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Grid container spacing={3}>
          {plans.map(plan => (
            <Grid xs={6} md={4} key={plan.id}>
              <PlanWidgetCard
                plan={plan}
                name={plan.name}
                monthly={plan.month_price}
                quarterly={plan.quarter_price}
                semi_annually={plan.half_year_price}
                annually={plan.year_price}
              />
            </Grid>
          ))}
        </Grid>

        

      </DashboardContent>
    </>
  );
}
