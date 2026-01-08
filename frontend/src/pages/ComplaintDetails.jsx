import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  FileText, 
  Paperclip, 
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await api.getComplaint(id);
      if (response.success) {
        setComplaint(response.data);
      }
    } catch (error) {
      console.error('Error fetching complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading complaint details...</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  if (!complaint) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Complaint Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The complaint you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Back to Dashboard
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="outline" 
            className="mb-6 shadow-md hover:shadow-lg animate-fadeInUp"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Dashboard
          </Button>

          {/* Header Card */}
          <Card className="mb-6 glass-effect border border-gray-200/50 dark:border-gray-700/50 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex flex-col gap-3 mb-3">
                  <h1 className="text-4xl font-bold gradient-text">
                    {complaint.title}
                  </h1>
                  <Badge status={complaint.status} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Complaint ID: <span className="font-mono font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">{complaint.id}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Filed On</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(complaint.created_at).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{complaint.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{complaint.location}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {complaint.description}
            </p>
          </Card>

          {/* Evidence */}
          {complaint.evidence_file && (
            <Card className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Paperclip className="w-5 h-5 mr-2" />
                Evidence Attached
              </h2>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-900 dark:text-white font-medium">{complaint.evidence_file}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`http://localhost:5000/uploads/${complaint.evidence_file}`, '_blank')}
                >
                  View
                </Button>
              </div>
            </Card>
          )}

          {/* Status Timeline */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Status Timeline
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    complaint.status === 'Resolved' 
                      ? 'bg-green-100 dark:bg-green-900' 
                      : complaint.status === 'Under Investigation'
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'bg-yellow-100 dark:bg-yellow-900'
                  }`}>
                    <CheckCircle2 className={`w-5 h-5 ${
                      complaint.status === 'Resolved' 
                        ? 'text-green-600 dark:text-green-400' 
                        : complaint.status === 'Under Investigation'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`} />
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge status={complaint.status} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Complaint filed and is currently {complaint.status.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Police Remarks */}
          {complaint.policeRemarks && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Police Remarks
              </h2>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {complaint.policeRemarks}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
