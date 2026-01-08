import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  XCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar
} from 'lucide-react';
import api from '@/utils/api';

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getAnalytics();
      if (response.success) {
        setAnalytics(response.data);
      } else {
        setError('Failed to load analytics');
      }
    } catch (error) {
      setError('Failed to load analytics data');
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <Button onClick={fetchAnalytics}>Retry</Button>
          </Card>
        </div>
      </div>
    );
  }

  const { overview, categories, trends } = analytics;

  const statusConfig = {
    Pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    Investigating: { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    Resolved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    Rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-full text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
              📊 Insights
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Crime Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Overview of crime reports and trends
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Complaints</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {overview.total}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
            </Card>

            {['Pending', 'Investigating', 'Resolved', 'Rejected'].map((status) => {
              const config = statusConfig[status];
              const Icon = config.icon;
              return (
                <Card key={status} className={`glass-effect border ${config.bg}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{status}</p>
                      <p className={`text-3xl font-bold ${config.color} mt-2`}>
                        {overview[status.toLowerCase()]}
                      </p>
                    </div>
                    <Icon className={`w-12 h-12 ${config.color}`} />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass-effect">
              <div className="flex items-center gap-3 mb-6">
                <PieChartIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Complaints by Category
                </h2>
              </div>
              <div className="space-y-4">
                {categories.map((cat, index) => {
                  const percentage = overview.total > 0 ? (cat.count / overview.total * 100).toFixed(1) : 0;
                  const colors = [
                    'bg-indigo-600',
                    'bg-purple-600',
                    'bg-pink-600',
                    'bg-orange-600',
                    'bg-blue-600',
                    'bg-green-600',
                    'bg-red-600',
                    'bg-yellow-600'
                  ];
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cat.category}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {cat.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Monthly Trends */}
            <Card className="glass-effect">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Monthly Trends
                </h2>
              </div>
              <div className="space-y-4">
                {trends.map((month, index) => {
                  const maxCount = Math.max(...trends.map(t => t.count));
                  const percentage = maxCount > 0 ? (month.count / maxCount * 100) : 0;
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {month.month}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {month.count} complaints
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Additional Stats */}
          <Card className="glass-effect bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Key Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resolution Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {overview.total > 0 ? ((overview.resolved / overview.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {overview.pending}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Investigations</p>
                <p className="text-2xl font-bold text-blue-600">
                  {overview.investigating}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
