import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------



import { fYuan} from 'src/utils/format-number';

// ----------------------------------------------------------------------

export function PlanWidgetCard({
  sx,
  name,
  monthly,
  quarterly,
  semi_annually,
  annually,
  plan,
  ...other
}) 
{

  const navigate = useNavigate();

  const handleBuySubscription = () => {
    // Navigate to /dashboard/payment and pass the plan details
    navigate('/dashboard/payment', {
      state: {
        plan
      },
    });
  };
    console.log({ name, monthly, quarterly, semi_annually, annually });
  const row = (label, value) => (
    <Box sx={{ display: 'flex', typography: 'body2', justifyContent: 'space-between' }}>
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {label}
      </Box>
      <Box component="span">{fYuan(value)}</Box>
    </Box>
  );

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      
      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ typography: 'h3' }}>{name}</Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        {monthly > 0 && row('Monthly', monthly)}
        {quarterly > 0 && row('Quarterly', quarterly)}
        {semi_annually > 0 && row('Semi Annually', semi_annually)}
        {annually > 0 && row('Annually', annually)}

        <Box sx={{ gap: 2, display: 'flex' }}>
          <Button fullWidth variant="contained" color="warning" onClick={handleBuySubscription}>
            Buy Subscription
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

