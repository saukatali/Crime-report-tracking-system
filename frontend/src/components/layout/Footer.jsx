import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6TTQgNHYyaDJWNEg0em0yOCAyOHYyaDJWMzJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3 group">
              <div className="relative">
                <Shield className="h-7 w-7 text-primary-500 group-hover:text-primary-400 transition-colors" />
                <div className="absolute inset-0 bg-primary-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Crime Report System</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              A modern platform for reporting and tracking criminal activities. 
              Help make your community safer by reporting crimes efficiently and securely.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-primary-600 hover:to-blue-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-3 text-base">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/login', label: 'Login' },
                { to: '/register', label: 'Register' },
                { to: '/file-complaint', label: 'File Complaint' }
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="group flex items-center gap-2 hover:text-primary-400 transition-colors">
                    <span className="w-0 h-0.5 bg-primary-500 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-3 text-base">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">123 Police Station Road, City Center, 110001</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Emergency: 100</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+91 9724610429</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">support@crimereport.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Crime Reporting & Tracking System. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            🛡️ Designed for public safety and community welfare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
