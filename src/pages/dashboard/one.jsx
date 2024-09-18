import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import Grid from '@mui/material/Unstable_Grid2';

import { AppFeatured } from 'src/layouts/components/app-featured';
import Button from '@mui/material/Button';
import { MotivationIllustration } from 'src/assets/illustrations';
import { AppWelcome } from 'src/layouts/components/app-welcome';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled, _analyticTasks,
  _analyticPosts,
  _analyticTraffic,
  _analyticOrderTimeline,} from 'src/_mock';

import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';

import { AnalyticsNews } from 'src/layouts/components/analytics/analytics-news';
import { AnalyticsTasks } from 'src/layouts/components/analytics/analytics-tasks';
import { AnalyticsCurrentVisits } from 'src/layouts/components/analytics/analytics-current-visits';
import { AnalyticsOrderTimeline } from 'src/layouts/components/analytics/analytics-order-timeline';
import { AnalyticsWebsiteVisits } from 'src/layouts/components/analytics/analytics-website-visits';
import { AnalyticsWidgetSummary } from 'src/layouts/components/analytics/analytics-widget-summary';
import { AnalyticsTrafficBySite } from 'src/layouts/components/analytics/analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from 'src/layouts/components/analytics/analytics-current-subject';
import { AnalyticsConversionRates } from 'src/layouts/components/analytics/analytics-conversion-rates';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWidgetCard } from '../../layouts/components/analytics/card-widget';

// ----------------------------------------------------------------------

const metadata = { title: `面板 | Dashboard - ${CONFIG.appName}` };


export default function Page() {

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
        <AppWelcome
            title="Connect with the world 👋 Enjoy global network acceleration from now on"
            description="Global acceleration of TikTok / Whatsapp / Facebook / Google / Youtube / Twitter / Instagram, etc., unlimited access to the Internet world."
            img={<MotivationIllustration hideBackground />}
            action={
              <Button variant="contained" color="primary" onClick={() => navigate(paths.dashboard.two)} >
                Buy Susbscription
              </Button>
            }
        />
        </Grid>
        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <DashboardContent maxWidth="xl">

        <Grid container spacing={3} >

                <Grid xs={12} sm={6} md={3}>
                  <AnalyticsWidgetCard
                    title="Windows Client"
                    description="Windows 32/64 bit"
                    icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-windows.svg`} />
                    }
                    
                  />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                <AnalyticsWidgetCard
                    title="Mac Client"
                    description="Intel/M chip mac os"
                    color="secondary"
                    icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-mac.svg`} />
                    }
                    
                  />
                </Grid>

                <Grid xs={12} sm={6} md={3}> 
                <AnalyticsWidgetCard
                    title="Android Client"
                    color="warning"
                    description="Huawei/ Xiaomi/ OPPO and other Android series"
                    icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-android.svg`} />
                    }
                    
                  />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                <AnalyticsWidgetCard
                    title="Ios Client"
                    color="error"
                    description="Iphone and Ipad full range"
                    icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-ios.svg`} />
                    }
                    
                  />
                </Grid>
                </Grid>
        </DashboardContent>

        <Grid container spacing={3} style={{ display: 'none' }}>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_analyticPosts} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_analyticOrderTimeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_analyticTraffic} />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_analyticTasks} />
        </Grid>
      </Grid>
      </Grid>
    </>
  );
}
