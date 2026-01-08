import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] animate-slideIn backdrop-blur-xl border-2 transform hover:scale-105 transition-transform ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-300 shadow-green-500/50'
                : toast.type === 'error'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-300 shadow-red-500/50'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-300 shadow-blue-500/50'
            }`}
          >
            <span className="flex-1 font-semibold text-lg">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white hover:text-gray-200 font-bold text-xl transition-transform hover:scale-125"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
