// src/components/table.js

// Define the table head columns
export const TABLE_HEAD = [
    { id: 'orderNumber', label: 'Order Number', width: '20%' },
    { id: 'cycle', label: 'Cycle', width: '15%' },
    { id: 'orderAmount', label: 'Order Amount', width: '15%' },
    { id: 'status', label: 'Order Status', width: '20%' },
    { id: 'createdAt', label: 'Creation Time', width: '25%' },
    { id: '', width: '5%' }, // Narrow width for actions
  ];
  
  // Define status options for the tabs
  export const STATUS_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'discounted', label: 'Discounted' },
  ];
  
  // Function to convert numeric status to text
  export const getStatusText = (status) => {
    switch (status) {
      case 0: return 'pending';
      case 1: return 'activating';
      case 2: return 'cancelled';
      case 3: return 'completed';
      case 4: return 'discounted';
      default: return 'unknown';
    }
  };

  