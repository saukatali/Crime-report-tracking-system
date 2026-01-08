import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import api from '@/utils/api';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/Sidebar';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Shield, FileText, Clock, Award, Settings, Lock, Bell, Camera, Activity, Trash2 } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('❌ Photo size should be less than 5MB', 'error');
        return;
      }
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      showToast('📸 Photo selected! Click Save to upload', 'success');
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    showToast('🗑️ Photo removed', 'success');
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        showToast('Profile updated successfully!', 'success');
      } else {
        showToast(result.error || 'Failed to update profile', 'error');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('⚠️ Are you absolutely sure? This action cannot be undone. All your complaints and data will be permanently deleted.')) {
      if (window.confirm('🔴 Final confirmation: Type YES in your mind and click OK to permanently delete your account.')) {
        try {
          showToast('🗑️ Deleting your account...', 'info');
          
          const response = await api.deleteUser(user.id);
          
          if (response.success) {
            logout();
            navigate('/');
            showToast('✅ Account deleted successfully. Sorry to see you go!', 'success');
          }
        } catch (error) {
          showToast('❌ Failed to delete account. Please try again.', 'error');
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-fadeInUp">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white text-sm font-bold mb-4 shadow-xl">
              👤 Account Settings
            </div>
            <h1 className="text-6xl font-black mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                My Profile
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
              Manage your personal information and account settings
            </p>
          </div>

          {/* Profile Card */}
          <Card className="mb-8 glass-effect border-2 border-white/50 dark:border-gray-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 pb-8 border-b-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="relative group">
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <div className="relative">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform animate-gradient border-4 border-white dark:border-gray-700">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <label 
                      htmlFor="profilePhoto"
                      className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform border-2 border-white dark:border-gray-800"
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </label>
                    {photoPreview && (
                      <button
                        onClick={removePhoto}
                        className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform border-2 border-white dark:border-gray-800"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                      {user?.name}
                    </span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold mt-1 text-lg">
                    ID: <span className="font-mono text-sm bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800">{user?.id}</span>
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-bold shadow-lg">
                      <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      ACTIVE
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white text-xs font-bold shadow-lg">
                      <Award className="w-3 h-3" />
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
              
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="shadow-xl hover:shadow-2xl transition-all">
                  <Edit2 className="w-5 h-5 mr-2 inline" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="shadow-lg ml-13"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold text-xl ml-13 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700">{user?.name}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="shadow-lg ml-13"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold text-xl ml-13 break-all bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700">{user?.email}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      className="shadow-lg ml-13"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold text-xl ml-13 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700">{user?.phone}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    Address
                  </label>
                  {isEditing ? (
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="shadow-lg ml-13"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-semibold text-xl ml-13 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700">{user?.address}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                  <Button onClick={handleSave} variant="success" className="flex-1 shadow-2xl hover:shadow-green-500/50 transition-all py-4 text-lg">
                    <Save className="w-5 h-5 mr-2 inline" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="secondary" className="flex-1 py-4 text-lg">
                    <X className="w-5 h-5 mr-2 inline" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Account Information */}
          <Card className="mb-8 glass-effect border-2 border-white/50 dark:border-gray-700/50 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <span className="text-gray-700 dark:text-gray-300 font-bold flex items-center text-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  Status
                </span>
                <span className="font-black text-green-600 dark:text-green-400 text-xl">Active</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <span className="text-gray-700 dark:text-gray-300 font-bold flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2" />
                  Member Since
                </span>
                <span className="font-black text-blue-600 dark:text-blue-400 text-xl">Nov 2024</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <span className="text-gray-700 dark:text-gray-300 font-bold flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2" />
                  Last Login
                </span>
                <span className="font-black text-purple-600 dark:text-purple-400 text-xl">Today</span>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-2 border-red-300 dark:border-red-800/50 bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-red-900/10 dark:via-pink-900/10 dark:to-red-800/10 shadow-2xl hover:shadow-red-500/30 transition-all duration-500">
            <h3 className="text-2xl font-black text-red-600 dark:text-red-400 mb-4 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              Danger Zone
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-400 mb-6 font-medium leading-relaxed">
              ⚠️ Once you delete your account, there is no going back. All your data will be permanently deleted. Please be certain before proceeding.
            </p>
            <Button 
              variant="danger" 
              className="shadow-2xl hover:shadow-red-500/50 transition-all py-3 px-6 text-base"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="w-5 h-5 mr-2 inline" />
              Delete Account Permanently
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
