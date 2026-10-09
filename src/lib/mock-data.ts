// Dashboard KPI Data
export const kpiData = [
  { id: 'visitors', label: 'Total Visitors', value: '2,01,620', change: 2.31, icon: 'users' },
  { id: 'clicks', label: 'Total Clicks', value: '1,96,325', change: 5.93, icon: 'mouse-pointer' },
  { id: 'commission', label: 'Commission', value: '1,20,145', change: 9.05, icon: 'dollar-sign' },
  { id: 'bounce', label: 'Bounce Rate', value: '1,546', change: -1.03, icon: 'trending-down' },
];

// Sales Overview Data
export const salesData = {
  '7d': {
    labels: ['Aug 21', 'Aug 22', 'Aug 23', 'Aug 24', 'Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29', 'Aug 30'],
    values: [4200, 3800, 5100, 4600, 3900, 4800, 5200, 4900, 6800, 8200],
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [28000, 32000, 29500, 38000],
  },
  '90d': {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    values: [95000, 108000, 125000],
  },
  '1y': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [82000, 78000, 91000, 87000, 95000, 102000, 98000, 115000, 108000, 120000, 118000, 135000],
  },
};

// Performance (Monthly Bar Chart)
export const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  target: [12000, 14000, 11000, 13000, 15000, 12500, 14500, 13500, 16000, 14000, 15500, 17000],
  paid: [10500, 12800, 9800, 11500, 13200, 11000, 12900, 12000, 14200, 12500, 13800, 15200],
  pending: [1500, 1200, 1200, 1500, 1800, 1500, 1600, 1500, 1800, 1500, 1700, 1800],
};

// Traffic Sources
export const trafficSources = [
  { name: 'Google', value: 89528, color: '#774AA4', percentage: 55 },
  { name: 'Social Media', value: 57658, color: '#5B2D8E', percentage: 35 },
  { name: 'Direct Message', value: 22717, color: '#22922F', percentage: 10 },
];

// Client Responds Trend (Intraday)
export const intradayData = {
  labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
  values: [2400, 3200, 5800, 8200, 7600, 9400, 12800, 14200, 16468],
};

// Client Responds Distribution
export const distributionData = [
  { name: 'Male', value: 58.08, color: '#774AA4' },
  { name: 'Female', value: 35.07, color: '#5B2D8E' },
  { name: 'Others', value: 6.05, color: '#E5DEEC' },
];

// User Rating
export const userRatings = [
  { rank: 1, name: 'Esther Howard', value: 25000, initials: 'EH', color: '#774AA4' },
  { rank: 2, name: 'Leslie Alexander', value: 18000, initials: 'LA', color: '#5B2D8E' },
  { rank: 3, name: 'Jenny Wilson', value: 14000, initials: 'JW', color: '#9B6FC7' },
  { rank: 4, name: 'Ronald Richards', value: 10000, initials: 'RR', color: '#C5B9D6' },
];

// Recent Activity
export const recentActivity = [
  { id: 1, user: 'Sarah Johnson', email: 'sarah.j@email.com', date: '2024-01-15 09:32', duration: '2h 15m', commission: '$1,250', status: 'success' },
  { id: 2, user: 'Michael Chen', email: 'm.chen@email.com', date: '2024-01-15 10:45', duration: '1h 42m', commission: '$890', status: 'pending' },
  { id: 3, user: 'Emily Davis', email: 'emily.d@email.com', date: '2024-01-14 14:20', duration: '3h 05m', commission: '$2,100', status: 'success' },
  { id: 4, user: 'James Wilson', email: 'j.wilson@email.com', date: '2024-01-14 16:55', duration: '45m', commission: '$340', status: 'success' },
  { id: 5, user: 'Lisa Anderson', email: 'lisa.a@email.com', date: '2024-01-13 11:10', duration: '1h 30m', commission: '$670', status: 'pending' },
  { id: 6, user: 'Robert Taylor', email: 'r.taylor@email.com', date: '2024-01-13 08:25', duration: '2h 50m', commission: '$1,890', status: 'success' },
  { id: 7, user: 'Amanda Brown', email: 'a.brown@email.com', date: '2024-01-12 15:40', duration: '1h 15m', commission: '$520', status: 'success' },
  { id: 8, user: 'David Martinez', email: 'd.martinez@email.com', date: '2024-01-12 09:00', duration: '3h 20m', commission: '$2,450', status: 'pending' },
  { id: 9, user: 'Jennifer Lee', email: 'j.lee@email.com', date: '2024-01-11 13:30', duration: '2h 00m', commission: '$1,100', status: 'success' },
  { id: 10, user: 'Christopher White', email: 'c.white@email.com', date: '2024-01-11 10:15', duration: '1h 45m', commission: '$780', status: 'success' },
];

// Component Showcase Data
export const tableMockData = [
  { id: 1, name: 'Olivia Martin', email: 'olivia@email.com', role: 'Admin', status: 'active', joined: '2023-06-15', revenue: '$12,500' },
  { id: 2, name: 'Jackson Lee', email: 'jackson@email.com', role: 'Editor', status: 'active', joined: '2023-08-22', revenue: '$8,200' },
  { id: 3, name: 'Isabella Nguyen', email: 'isabella@email.com', role: 'Viewer', status: 'inactive', joined: '2023-09-10', revenue: '$3,400' },
  { id: 4, name: 'William Kim', email: 'william@email.com', role: 'Editor', status: 'active', joined: '2023-11-05', revenue: '$9,800' },
  { id: 5, name: 'Sofia Davis', email: 'sofia@email.com', role: 'Admin', status: 'active', joined: '2024-01-02', revenue: '$15,200' },
  { id: 6, name: 'Lucas Johnson', email: 'lucas@email.com', role: 'Viewer', status: 'pending', joined: '2024-01-10', revenue: '$1,200' },
  { id: 7, name: 'Mia Williams', email: 'mia@email.com', role: 'Editor', status: 'active', joined: '2024-01-15', revenue: '$6,700' },
  { id: 8, name: 'Ethan Brown', email: 'ethan@email.com', role: 'Viewer', status: 'inactive', joined: '2023-05-20', revenue: '$2,100' },
];

export const notificationExamples = [
  { type: 'success', title: 'Success', message: 'Your changes have been saved successfully.' },
  { type: 'error', title: 'Error', message: 'Failed to process the request. Please try again.' },
  { type: 'warning', title: 'Warning', message: 'Your session will expire in 5 minutes.' },
  { type: 'info', title: 'Information', message: 'A new version is available for download.' },
];
