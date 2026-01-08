import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Clock, TrendingUp, XCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import api from '@/utils/api';

const TrackComplaint = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setComplaint(null);

      const response = await api.trackAnonymousComplaint(trackingCode);
      
      if (response.success) {
        setComplaint(response.data);
      } else {
        setError(response.message || 'Complaint not found');
      }
    } catch (error) {
      setError(error.message || 'Failed to track complaint');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      Pending: {
        icon: Clock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        description: 'Your complaint has been received and is awaiting review'
      },
      Investigating: {
        icon: TrendingUp,
        color: 'text-blue-600',
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        description: 'Your complaint is currently under investigation'
      },
      Resolved: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-100 dark:bg-green-900/30',
        description: 'Your complaint has been resolved'
      },
      Rejected: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-100 dark:bg-red-900/30',
        description: 'Your complaint has been rejected'
      }
    };
    return configs[status] || configs.Pending;
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 mb-4">
            🔍 Track Status
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Track Your Anonymous Complaint
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Enter your tracking code to check the status of your anonymous complaint
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass-effect mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <Input
              label="Tracking Code"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="e.g., CR-1234567890-ABCD"
              error={error}
            />
            
            <Button type="submit" disabled={loading} size="lg" className="w-full">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Complaint
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-6 animate-fadeInUp">
            {/* Status Card */}
            <Card className={`glass-effect ${getStatusConfig(complaint.status).bg} border-2`}>
              <div className="text-center py-8">
                {React.createElement(getStatusConfig(complaint.status).icon, {
                  className: `w-16 h-16 ${getStatusConfig(complaint.status).color} mx-auto mb-4`
                })}
                <h2 className={`text-3xl font-bold ${getStatusConfig(complaint.status).color} mb-2`}>
                  {complaint.status}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {getStatusConfig(complaint.status).description}
                </p>
              </div>
            </Card>

            {/* Complaint Information */}
            <Card className="glass-effect">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Complaint Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Complaint ID
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    #{complaint.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Title
                  </p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {complaint.title}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Category
                  </p>
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium">
                    {complaint.category}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Location
                  </p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {complaint.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Description
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {complaint.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Filed On
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Last Updated
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(complaint.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Important Notice */}
            <Card className="glass-effect bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Important Information
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Save your tracking code to check status updates</li>
                    <li>• You will not be contacted directly as this is an anonymous complaint</li>
                    <li>• Check back regularly for status updates</li>
                    <li>• If you have additional information, you may file a new complaint</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* How to Track Info */}
        {!complaint && !loading && (
          <Card className="glass-effect">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How to Track Your Complaint
            </h3>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Enter the tracking code you received when you filed your anonymous complaint</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Click the "Track Complaint" button</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>View the current status and details of your complaint</span>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ <strong>Note:</strong> Tracking codes are case-sensitive. Please enter it exactly as provided.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;
