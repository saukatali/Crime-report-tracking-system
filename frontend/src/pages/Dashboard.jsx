import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import api from '@/utils/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import { FileText, Clock, CheckCircle, AlertCircle, PlusCircle, Eye, TrendingUp, Activity, Award, Target, Edit2, Trash2, X } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [userComplaints, setUserComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.getUserComplaints(user.id);
      if (response.success) {
        setUserComplaints(response.data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (complaint) => {
    setEditingComplaint(complaint.id);
    setEditForm({
      title: complaint.title,
      category: complaint.category,
      location: complaint.location,
      description: complaint.description
    });
  };

  const handleCancelEdit = () => {
    setEditingComplaint(null);
    setEditForm({ title: '', category: '', location: '', description: '' });
  };

  const handleUpdateComplaint = async (complaintId) => {
    try {
      const response = await api.updateComplaint(complaintId, editForm);
      if (response.success) {
        await fetchComplaints();
        setEditingComplaint(null);
        showToast('✅ Complaint updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      showToast('❌ Failed to update complaint. Please try again.', 'error');
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (window.confirm('⚠️ Are you sure you want to delete this complaint? This action cannot be undone.')) {
      try {
        const response = await api.deleteComplaint(complaintId);
        if (response.success) {
          await fetchComplaints();
          showToast('🗑️ Complaint deleted successfully!', 'success');
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
        showToast('❌ Failed to delete complaint. Please try again.', 'error');
      }
    }
  };

  const stats = [
    {
      icon: FileText,
      label: 'Total Complaints',
      value: userComplaints.length,
      change: '+12%',
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: userComplaints.filter(c => c.status === 'Pending').length,
      change: '+3',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Activity,
      label: 'Under Investigation',
      value: userComplaints.filter(c => c.status === 'Under Investigation').length,
      change: '+5',
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: CheckCircle,
      label: 'Resolved',
      value: userComplaints.filter(c => c.status === 'Resolved').length,
      change: '+8',
      iconColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's an overview of your complaints
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/file-complaint">
                <Button className="w-full justify-start">
                  <PlusCircle className="w-5 h-5 mr-3" />
                  File New Complaint
                </Button>
              </Link>
              <Link to="/track-complaint">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-5 h-5 mr-3" />
                  Track Complaint
                </Button>
              </Link>
            </div>
          </Card>

          {/* Activity Summary */}
          <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Activity Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Complaints */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Your Complaints
            </h2>
          </div>

          {userComplaints.length === 0 ? (
            <Card className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Complaints Filed Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                You haven't filed any complaints yet. Click the button below to file your first complaint.
              </p>
              <Link to="/file-complaint">
                <Button size="lg">
                  <PlusCircle className="w-5 h-5 mr-2 inline" />
                  File Your First Complaint
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {userComplaints.map((complaint, index) => (
                <Card 
                  key={complaint.id} 
                  hover 
                  className="glass-effect border border-gray-200/50 dark:border-gray-700/50 group"
                  style={{ animationDelay: `${(index + 7) * 100}ms` }}
                >
                  {editingComplaint === complaint.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold gradient-text">Edit Complaint</h3>
                        <button onClick={handleCancelEdit} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="Theft">Theft</option>
                            <option value="Robbery">Robbery</option>
                            <option value="Assault">Assault</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Vandalism">Vandalism</option>
                            <option value="Cybercrime">Cybercrime</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                          <input
                            type="text"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => handleUpdateComplaint(complaint.id)} className="flex-1">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {complaint.title}
                              </h3>
                              <Badge status={complaint.status} />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                              <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">#{complaint.id}</span>
                              <span className="text-gray-400">•</span>
                              <span>Filed on {new Date(complaint.created_at).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 text-sm mb-4">
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                            <FileText className="w-4 h-4" />
                            {complaint.category}
                          </span>
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">
                            <AlertCircle className="w-4 h-4" />
                            {complaint.location}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                          {complaint.description}
                        </p>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <Link to={`/complaint/${complaint.id}`} className="flex-1 lg:flex-none">
                          <Button variant="outline" size="md" className="w-full shadow-md hover:shadow-lg whitespace-nowrap">
                            <Eye className="w-4 h-4 mr-2 inline" />
                            View
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="md" 
                          onClick={() => handleEdit(complaint)}
                          className="flex-1 lg:flex-none shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                          <Edit2 className="w-4 h-4 mr-2 inline" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="md" 
                          onClick={() => handleDeleteComplaint(complaint.id)}
                          className="flex-1 lg:flex-none shadow-md hover:shadow-lg whitespace-nowrap text-red-600 hover:text-red-700 hover:border-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2 inline" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
