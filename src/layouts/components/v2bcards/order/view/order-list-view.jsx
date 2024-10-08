import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Card from '@mui/material/Card';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Label } from 'src/components/label';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock order data
const orders = [
  { id: 1, orderNumber: '1001', cycle: 'Monthly', orderAmount: '$100', status: 'completed', createdAt: '2024-09-20 10:00 AM' },
  { id: 2, orderNumber: '1002', cycle: 'Weekly', orderAmount: '$50', status: 'pending', createdAt: '2024-09-21 11:30 AM' },
  { id: 3, orderNumber: '1003', cycle: 'Monthly', orderAmount: '$75', status: 'cancelled', createdAt: '2024-09-22 12:15 PM' },
  { id: 4, orderNumber: '1004', cycle: 'Yearly', orderAmount: '$500', status: 'completed', createdAt: '2024-09-23 01:00 PM' },
  { id: 5, orderNumber: '1005', cycle: 'Monthly', orderAmount: '$120', status: 'pending', createdAt: '2024-09-24 02:45 PM' },
];

// Define the table head columns
const TABLE_HEAD = [
  { id: 'orderNumber', label: 'Order Number', width: '15%' },
  { id: 'cycle', label: 'Cycle', width: '15%' },
  { id: 'orderAmount', label: 'Order Amount', width: '20%' },
  { id: 'status', label: 'Order Status', width: '20%' },
  { id: 'createdAt', label: 'Creation Time', width: '25%' },
  { id: '', width: '5%' }, // Narrow width for actions
];

// Define status options for the tabs
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function SimpleOrderTable() {
  const [status, setStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Handle status tab change
  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
  };

  // Handle menu open
  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrder(order);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentOrder(null);
  };

  // Count orders based on their status
  const getStatusCounts = () =>
    STATUS_OPTIONS.map(option => ({
      ...option,
      count: orders.filter(order => option.value === 'all' || order.status === option.value).length,
    }));

  const statusCounts = getStatusCounts();

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (status === 'all') return true;
    return order.status === status;
  });

  return (
    <Card>
      {/* Tabs for status filtering */}
      <Box sx={{ px: 2.5 }}>
        <Tabs
          value={status}
          onChange={handleStatusChange}
          aria-label="status filter tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {statusCounts.map(option => (
            <Tab
              key={option.value}
              value={option.value}
              label={`${option.label} (${option.count})`} // Include count next to label
              icon={
                <Label
                  color={
                    (option.value === 'completed' && 'success') ||
                    (option.value === 'pending' && 'warning') ||
                    (option.value === 'cancelled' && 'error') ||
                    'default'
                  }
                >
                  {option.label}
                </Label>
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>

      {/* Table Head */}
      <Table
        size="medium"
        sx={{
          minWidth: 960,
          tableLayout: 'fixed',
        }}
      >
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map(column => (
              <TableCell
                key={column.id}
                style={{ width: column.width }}
                align={column.align || 'left'}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.cycle}</TableCell>
              <TableCell>{order.orderAmount}</TableCell>
              <TableCell>
                <Label color={
                  (order.status === 'completed' && 'success') ||
                  (order.status === 'pending' && 'warning') ||
                  (order.status === 'cancelled' && 'error')}
                >
                  {order.status}
                </Label>
              </TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>
                <IconButton onClick={event => handleMenuOpen(event, order)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          // Preview action
          alert(`Previewing order ${currentOrder?.orderNumber}`);
          handleMenuClose();
        }}>
          Preview
        </MenuItem>
        <MenuItem onClick={() => {
          // Delete action
          alert(`Deleting order ${currentOrder?.orderNumber}`);
          handleMenuClose();
        }}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}
