import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderVariant?: 'normal' | 'danger' | 'warning' | 'info' | 'highlight' | 'subtle';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  borderVariant = 'normal',
}) => {
  const borderClasses = {
    normal: 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow',
    subtle: 'border-slate-100 shadow-none hover:border-slate-200',
    danger: 'border-red-200 bg-red-50/30 shadow-sm shadow-red-100/50',
    warning: 'border-amber-200 bg-amber-50/30 shadow-sm shadow-amber-100/50',
    info: 'border-blue-200 bg-blue-50/20 shadow-sm shadow-blue-100/40',
    highlight: 'border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 shadow-sm',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-5 transition-all duration-200 ${
        borderClasses[borderVariant]
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
