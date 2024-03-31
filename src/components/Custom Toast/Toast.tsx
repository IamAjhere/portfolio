import React from 'react';
import './Toast.css';

export interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'loading' | '';
}

const Toast: React.FC<ToastProps> = ({ show, message, type }) => {
  let backgroundColor, icon;

  switch (type) {
    case 'success':
      backgroundColor = 'bg-green-500';
      icon = <i className='fas fa-check-circle mr-2'></i>;
      break;
    case 'error':
      backgroundColor = 'bg-red-500';
      icon = <i className='fas fa-times-circle mr-2'></i>;
      break;
    case 'loading':
      backgroundColor = 'bg-blue-500';
      icon = <i className='fas fa-spinner fa-spin mr-2'></i>;
      break;
    default:
      backgroundColor = '';
      icon = null;
  }

  return (
    <div className={`toast ${show ? 'show' : ''} ${backgroundColor}`}>
      {icon}
      {message}
    </div>
  );
};

export default Toast;
