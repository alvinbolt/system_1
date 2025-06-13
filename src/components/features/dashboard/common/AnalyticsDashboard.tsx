import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, Users, Building, DollarSign, Star } from 'lucide-react';

interface AnalyticsData {
  bookings: {
    total: number;
    byMonth: { month: string; count: number }[];
    byStatus: { status: string; count: number }[];
  };
  revenue: {
    total: number;
    byMonth: { month: string; amount: number }[];
    byRoomType: { type: string; amount: number }[];
  };
  occupancy: {
    rate: number;
    byMonth: { month: string; rate: number }[];
    byRoomType: { type: string; rate: number }[];
  };
  reviews: {
    average: number;
    total: number;
    distribution: { rating: number; count: number }[];
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard: React.FC<{ userRole: 'broker' | 'owner' }> = ({ userRole }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Replace with actual data from API
  const mockData: AnalyticsData = {
    bookings: {
      total: 156,
      byMonth: [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 15 },
        { month: 'Mar', count: 18 },
        { month: 'Apr', count: 14 },
        { month: 'May', count: 20 },
        { month: 'Jun', count: 25 },
      ],
      byStatus: [
        { status: 'Pending', count: 15 },
        { status: 'Confirmed', count: 45 },
        { status: 'Completed', count: 85 },
        { status: 'Cancelled', count: 11 },
      ],
    },
    revenue: {
      total: 4500000,
      byMonth: [
        { month: 'Jan', amount: 350000 },
        { month: 'Feb', amount: 420000 },
        { month: 'Mar', amount: 380000 },
        { month: 'Apr', amount: 450000 },
        { month: 'May', amount: 520000 },
        { month: 'Jun', amount: 580000 },
      ],
      byRoomType: [
        { type: 'Single', amount: 1800000 },
        { type: 'Double', amount: 2200000 },
        { type: 'Triple', amount: 500000 },
      ],
    },
    occupancy: {
      rate: 78,
      byMonth: [
        { month: 'Jan', rate: 65 },
        { month: 'Feb', rate: 70 },
        { month: 'Mar', rate: 75 },
        { month: 'Apr', rate: 72 },
        { month: 'May', rate: 80 },
        { month: 'Jun', rate: 85 },
      ],
      byRoomType: [
        { type: 'Single', rate: 85 },
        { type: 'Double', rate: 75 },
        { type: 'Triple', rate: 65 },
      ],
    },
    reviews: {
      average: 4.5,
      total: 89,
      distribution: [
        { rating: 5, count: 45 },
        { rating: 4, count: 25 },
        { rating: 3, count: 12 },
        { rating: 2, count: 5 },
        { rating: 1, count: 2 },
      ],
    },
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-4xl font-bold text-red-600 mb-8">ANALYTICS DASHBOARD IS RENDERING!</h1> */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.bookings.total}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                UGX {mockData.revenue.total.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.occupancy.rate}%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.reviews.average}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>Based on {mockData.reviews.total} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Over Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bookings Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" key={`bookings-over-time-${userRole}`}>
              <LineChart data={mockData.bookings.byMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0088FE"
                  strokeWidth={2}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Room Type */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Room Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" key={`revenue-by-room-type-${userRole}`}>
              <PieChart>
                <Pie
                  data={mockData.revenue.byRoomType}
                  dataKey="amount"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {mockData.revenue.byRoomType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Occupancy Rate Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" key={`occupancy-rate-${userRole}`}>
              <LineChart data={mockData.occupancy.byMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#00C49F"
                  strokeWidth={2}
                  name="Occupancy Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Review Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Review Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" key={`review-distribution-${userRole}`}>
              <BarChart data={mockData.reviews.distribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FFBB28" name="Number of Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" key={`booking-status-distribution-${userRole}`}>
              <PieChart>
                <Pie
                  data={mockData.bookings.byStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockData.bookings.byStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Type Occupancy */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Room Type Occupancy</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" key={`room-type-occupancy-${userRole}`}>
              <BarChart data={mockData.occupancy.byRoomType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#8884D8" name="Occupancy Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 