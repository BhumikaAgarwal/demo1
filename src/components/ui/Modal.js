import React from 'react';

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-md w-full">
      {children}
      <button onClick={onClose} className="mt-4 text-sm text-blue-500">Close</button>
    </div>
  </div>
);

export default Modal;
