import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Shield, FileText, Clock, CheckCircle, Lock, Users, UserCircle } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FileText,
      title: 'Easy Reporting',
      description: 'File complaints quickly with our user-friendly interface.'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Report crimes anytime, anywhere with instant access.'
    },
    {
      icon: CheckCircle,
      title: 'Track Status',
      description: 'Monitor your complaints with real-time updates.'
    },
    {
      icon: Lock,
      title: 'Secure',
      description: 'Your data is protected with advanced encryption.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Reports Filed', gradient: 'from-blue-500 to-indigo-600' },
    { number: '8.5K+', label: 'Resolved', gradient: 'from-green-500 to-emerald-600' },
    { number: '95%', label: 'Success', gradient: 'from-yellow-500 to-orange-600' },
    { number: '24/7', label: 'Support', gradient: 'from-pink-500 to-rose-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Secure • Fast • Reliable
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Online Crime Reporting<br />
              & Tracking System
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Report crimes instantly, track investigations in real-time, and help make your community safer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/file-complaint">
                  <Button size="lg" className="!bg-white !text-indigo-600 hover:!bg-indigo-50 shadow-lg hover:shadow-xl">
                    <FileText className="w-5 h-5 mr-2" />
                    File Complaint Now
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="!bg-white !text-indigo-600 hover:!bg-indigo-50 shadow-lg hover:shadow-xl">
                      <FileText className="w-5 h-5 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/track-complaint">
                    <Button variant="outline" size="lg" className="!border-2 !border-white !text-white hover:!bg-white hover:!text-indigo-600">
                      <Shield className="w-5 h-5 mr-2" />
                      Track Complaint
                    </Button>
                  </Link>
                </>
              )}
              {!user && (
                <Link to="/login">
                  <Button variant="outline" size="lg" className="!border-2 !border-white !text-white hover:!bg-white hover:!text-indigo-600">
                    <UserCircle className="w-5 h-5 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border-2 border-white/30 rounded-2xl p-6 hover:scale-105 transition-transform shadow-2xl hover:shadow-xl`}>
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-white font-semibold text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Modern, secure, and user-friendly platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Simple Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Create your secure account', icon: '📝' },
              { step: '2', title: 'Report', desc: 'File your complaint with details', icon: '📋' },
              { step: '3', title: 'Track', desc: 'Monitor status in real-time', icon: '📊' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands helping create a safer community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="!bg-white !text-indigo-600 hover:!bg-indigo-50 shadow-lg hover:shadow-xl">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="!border-2 !border-white !text-white hover:!bg-white hover:!text-indigo-600">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
