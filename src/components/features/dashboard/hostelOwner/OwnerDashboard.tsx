import DashboardLayout from '../../../layout/DashboardLayout';
import OwnerSidebar from './OwnerSidebar';
import { Star } from 'lucide-react';

interface OwnerDashboardProps {
  children?: React.ReactNode;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ children }) => {
  return (
    <DashboardLayout sidebar={<OwnerSidebar />}>
      {children || (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Hello from Owner Dashboard!</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-primary-900 mb-2">5</div>
              <div className="text-gray-600">Your Hostels</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-secondary-600 mb-2">42</div>
              <div className="text-gray-600">Total Rooms</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">32</div>
              <div className="text-gray-600">Occupied Rooms</div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-primary-900 mb-2">76%</div>
              <div className="text-gray-600">Occupancy Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Your Hostels</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Olympia Hostel</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Makerere University</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">12</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">80%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          4.5
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sunset Residences</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Mbarara University</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">30</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">73%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          4.8
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {/* Add review data here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerDashboard;
