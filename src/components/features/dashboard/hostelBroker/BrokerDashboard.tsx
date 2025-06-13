import DashboardLayout from '../../../layout/DashboardLayout';
import BrokerSidebar from './BrokerSidebar';
import { Users, Building } from 'lucide-react';

interface BrokerDashboardProps {
  children?: React.ReactNode;
}

const BrokerDashboard: React.FC<BrokerDashboardProps> = ({ children }) => {
  return (
    <DashboardLayout sidebar={<BrokerSidebar />}>
      {children || (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      )}
    </DashboardLayout>
  );
};

export default BrokerDashboard;
