import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Welcome, {user?.email}</h2>
              <p className="text-gray-600 mt-2">
                This is your dashboard. Here you can manage your profile, practice interviews, and track your progress.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                <p className="text-gray-600 mt-2">
                  Complete your profile to get personalized interview preparation.
                </p>
              </div>
              
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Practice Interviews</h3>
                <p className="text-gray-600 mt-2">
                  Start practicing with our AI-powered interview simulator.
                </p>
              </div>
              
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
                <p className="text-gray-600 mt-2">
                  Track your interview preparation progress and improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 