import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Divider } from '@mui/material';

const ProductOrderPage = () => {
  const productName = "Sample Product";
  const cycle = "Monthly";
  const orderNumber = "123456789";
  const orderAmount = "$99.99"; // Add order amount
  const creationTime = "2024-09-26 14:30"; // Add creation time

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      {/* First Card - Product Information */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Product Information" />
          <Divider />
          <CardContent>
            <Typography variant="h6">Product Name: {productName}</Typography>
            <Typography variant="body1">Type/Cycle: {cycle}</Typography>
            <Typography variant="body1">Product Transfer Data: 200GB</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Second Card - Order Details */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Order Details" />
          <Divider />
          <CardContent>
            <Typography variant="h6">Order Number: {orderNumber}</Typography>
            <Typography variant="body1">Order Amount: {orderAmount}</Typography>
            <Typography variant="body1">Creation Time: {creationTime}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductOrderPage;
