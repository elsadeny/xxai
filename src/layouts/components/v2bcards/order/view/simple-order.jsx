import React, { useState, useEffect } from 'react';
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
import axios, { endpoints } from 'src/utils/axios';
import { TABLE_HEAD, STATUS_OPTIONS, getStatusText } from 'src/layouts/components/table'; // Import constants
import { fYuan } from 'src/utils/format-number';

export function SimpleOrderTable() {
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState([]); // Initially empty orders
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const res = await axios.get(endpoints.user.orderFetch); // Fetch data
      const fetchedOrders = res.data.data.map((order) => ({
        id: order.trade_no,
        orderNumber: order.trade_no,
        cycle: order.period,
        orderAmount: fYuan(order.total_amount),
        createdAt: new Date(order.created_at * 1000).toLocaleString(), // Convert to human-readable date
        status: getStatusText(order.status), // Convert status to text
      }));
      console.log("Fetched Orders:", fetchedOrders); // Log the fetched orders
      setOrders(fetchedOrders); // Update state with fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // useEffect to fetch orders on component mount
  useEffect(() => {
    fetchOrders(); // Fetch orders when component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle status tab change
  const handleStatusChange = async (event, newValue) => {
    setStatus(newValue);
    await fetchOrders(); // Fetch orders on status change
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

  const navigate = useNavigate();
  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (status === 'all') return true;
    return order.status === status;
  });

  // Count orders based on their status
const getStatusCounts = () => {
  const counts = STATUS_OPTIONS.map(option => {
    const count = orders.filter(order => option.value === 'all' || order.status === option.value).length;

    // Log the current option and its count
    console.log(`Counting for option: ${option.label}, Status: ${option.value}, Count: ${count}`);
    
    return {
      ...option,
      count,
    };
  });

  console.log("Status Counts:", counts); // Log final counts for all options
  return counts;
};

const statusCounts = getStatusCounts();

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
          {statusCounts.map((option) => (
            <Tab
              key={option.value}
              value={option.value}
              label={option.label}
              icon={
                <Label
                  color={
                    (option.value === 'completed' && 'success') ||
                    (option.value === 'pending' && 'warning') ||
                    (option.value === 'cancelled' && 'error') ||
                    (option.value === 'discounted' && 'error') ||
                    'default'
                  }
                >
                  {option.count}
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
          tableLayout: 'fixed', // Ensures fixed layout
        }}
      >
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map((column) => (
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
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.cycle}</TableCell>
              <TableCell>{order.orderAmount}</TableCell>
              <TableCell>
                <Label color={
                  (order.status === 'completed' && 'success') ||
                  (order.status === 'pending' && 'warning') ||
                  (order.status === 'cancelled' && 'error') || 
                  (order.status === 'discounted' && 'error')}
                >
                  {order.status}
                </Label>
              </TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleMenuOpen(event, order)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {filteredOrders.length === 0 && (
            <TableRow>
              <TableCell colSpan={TABLE_HEAD.length} align="center">
                No orders found
              </TableCell>
            </TableRow>
          )}
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
          navigate('/order/order-details', {
            
          });
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
