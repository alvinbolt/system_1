import DashboardLayout from '../../../layout/DashboardLayout';
import BrokerSidebar from './BrokerSidebar';
import { Users, Building } from 'lucide-react';

const BrokerDashboard = () => {
  return (
    <DashboardLayout sidebar={<BrokerSidebar />}>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-primary-900 mb-2">12</div>
            <div className="text-gray-600">Active Clients</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-secondary-600 mb-2">8</div>
            <div className="text-gray-600">Pending Bookings</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-green-500 mb-2">25</div>
            <div className="text-gray-600">Completed Bookings</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-primary-900 mb-2">UGX 320k</div>
            <div className="text-gray-600">Commission (This Month)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-50 text-primary-900 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold ml-3">Active Clients</h3>
            </div>
            <p className="text-gray-500">Your active clients will appear here.</p>
            <button className="mt-4 text-primary-900 font-medium hover:underline">View All Clients</button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-50 text-primary-900 rounded-lg">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold ml-3">Partner Hostels</h3>
            </div>
            <p className="text-gray-500">Your partner hostels will appear here.</p>
            <button className="mt-4 text-primary-900 font-medium hover:underline">View All Partners</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Olympia Hostel</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Single</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">UGX 450,000</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">UGX 45,000</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Livingstone Hostel</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Double</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">UGX 350,000</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">UGX 35,000</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrokerDashboard;
