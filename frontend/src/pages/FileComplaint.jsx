import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { COMPLAINT_CATEGORIES } from '@/utils/constants';
import api from '@/utils/api';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import FileUpload from '@/components/ui/FileUpload';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import { Send, AlertCircle } from 'lucide-react';

const FileComplaint = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Theft',
    location: '',
    description: '',
    evidence: [],
    isAnonymous: false
  });
  
  const [errors, setErrors] = useState({});
  const [trackingCode, setTrackingCode] = useState('');
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFileChange = (files) => {
    setFormData({
      ...formData,
      evidence: files
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title) {
      newErrors.title = 'Crime title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('is_anonymous', formData.isAnonymous);
      
      // Add multiple evidence files
      if (formData.evidence.length > 0) {
        formData.evidence.forEach(file => {
          formDataToSend.append('evidence', file);
        });
      }

      const response = await api.createComplaint(formDataToSend);
      
      if (response.success) {
        if (formData.isAnonymous && response.data.trackingCode) {
          // Show tracking code modal for anonymous complaints
          setTrackingCode(response.data.trackingCode);
          setShowTrackingModal(true);
        } else {
          const complaintId = response.data.complaintId;
          showToast(`Complaint filed successfully! Reference ID: ${complaintId}`, 'success');
          
          // Navigate to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        showToast(response.message || 'Failed to file complaint', 'error');
      }
    } catch (error) {
      showToast(error.message || 'Failed to file complaint', 'error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Login Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please login to file a complaint
          </p>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fadeInUp">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/50 dark:to-blue-900/50 rounded-full text-sm font-semibold text-primary-700 dark:text-primary-300 mb-4">
              📝 New Report
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              File New Complaint
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Please provide detailed information about the incident. All fields marked with * are required.
            </p>
          </div>

          {/* Form */}
          <Card className="glass-effect border border-gray-200/50 dark:border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crime Title */}
              <Input
                label="Crime Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Brief title of the incident (e.g., Laptop stolen from office)"
              />

              {/* Category and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Crime Category *"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={COMPLAINT_CATEGORIES}
                  error={errors.category}
                />

                <Input
                  label="Location *"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  placeholder="Exact location where incident occurred"
                />
              </div>

              {/* Description */}
              <TextArea
                label="Detailed Description *"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                rows={6}
                placeholder="Provide a detailed description of the incident including date, time, what happened, and any other relevant information..."
              />

              {/* Anonymous Reporting */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="font-medium text-purple-900 dark:text-purple-100">
                      Submit Anonymously
                    </span>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      You'll receive a tracking code to check your complaint status without logging in
                    </p>
                  </div>
                </label>
              </div>

              {/* Evidence Upload */}
              <FileUpload
                label="Upload Evidence (Optional - Max 5 files)"
                accept="image/*,video/*,.pdf,.doc,.docx"
                multiple={true}
                onChange={handleFileChange}
                maxFiles={5}
              />

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Important Information:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                  <li>Provide accurate and truthful information</li>
                  <li>Upload clear images or videos as evidence if available</li>
                  <li>You will receive a complaint reference ID after submission</li>
                  <li>You can track the status of your complaint from the dashboard</li>
                  <li>Filing a false complaint is a punishable offense</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" size="lg">
                  <Send className="w-5 h-5 mr-2 inline" />
                  Submit Complaint
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          {/* Tracking Code Modal */}
          {showTrackingModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Complaint Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Save this tracking code to check your complaint status:
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg p-6 mb-6">
                    <p className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400 select-all">
                      {trackingCode}
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ⚠️ <strong>Important:</strong> Please save this code. You cannot retrieve it later!
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(trackingCode);
                        showToast('Tracking code copied to clipboard!', 'success');
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Copy Code
                    </Button>
                    <Button
                      onClick={() => {
                        setShowTrackingModal(false);
                        navigate('/');
                      }}
                      className="flex-1"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileComplaint;
