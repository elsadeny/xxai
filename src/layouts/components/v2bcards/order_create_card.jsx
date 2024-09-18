import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import React, { useState } from 'react';

import Divider from '@mui/material/Divider';

import { varAlpha, bgGradient } from 'src/theme/styles';


import { orderSave } from '../../../auth/context/jwt';
import { useAuthContext } from '../../../auth/hooks';

// ----------------------------------------------------------------------


export function OrderCreateCard({ name,price,plan,cycle, title, sx, ...other}) {
  const theme = useTheme();

  const [couponValue, setCouponValue] = useState('');

  const { checkUserSession } = useAuthContext;

  const [errorMsg, setErrorMsg] = useState('');

  const handleRequestCoupon = () => {
    // Handle the coupon verification logic here
    console.log('Verifying coupon:', couponValue);
  };

  async function saveOrder(plan_id) {
    try {
      // Assuming orderSave is an async function that processes the order
      console.log(cycle);
      console.log(plan_id);

      // await orderSave( {cycle:cycle, plan_id: plan_id});
      await orderSave({ period:cycle, plan_id });
      await checkUserSession?.(); // Check session after order save
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  }

  return (
    <Card
      sx={{
       
        p: 5,
        borderRadius: 2,
        position: 'relative',
        color: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <InputBase
        fullWidth
        value={couponValue} // Controlled input value
        onChange={(e) => setCouponValue(e.target.value)} // Update state on input change
        placeholder="Have Coupons"
        endAdornment={
          <Button color="warning" variant="contained" size="small" sx={{ mr: 0.5 }} onClick={handleRequestCoupon}>
            Verify
          </Button>
        }
        inputProps={{
          id: 'input-email',
          sx: {
            color: 'common.white',
            '&::placeholder': { opacity: 1, color: 'inherit' },
          },
        }}
        sx={{
          pl: 1.5,
          height: 40,
          borderRadius: 1,
          bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.12),
        }}
      />

      <Card sx={{ p: 3, mt: 4, bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.12), ...sx }} {...other}>
        <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ typography: 'h5' }}>{title || 'Order Total'}</Box>
          
          <Box sx={{ display: 'flex', typography: 'body2', justifyContent: 'space-between' }}>
            <Box component="span" sx={{ color: 'text.primary' }}>
              { name }
            </Box>
            <Box component="span">{price || "$0"}</Box>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box component="span" sx={{ color: 'text.primary' }}>
              Total
            </Box>
            <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {price || "$0"}
            </Box>

          <Box sx={{ gap: 2, display: 'flex' }}>
            <Button fullWidth variant="contained" color="warning" onClick={() => saveOrder( plan.id)}>
              Order
            </Button>
          </Box>
        </Box>
      </Card>
    </Card>
  );
}