import { CirclePlay } from 'lucide-react';
import React from 'react';

const Button = ({
  onClick,
  className,
  children,
  icon = <CirclePlay className='w-5 h-5 inline-block ml-2' />,
  type = 'button',
  bgColor = 'primary'
}: {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: 'primary' | 'secondary';
}) => {
  let bgClassName = 'bg-primary';
  switch (bgColor) {
    case 'primary':
      bgClassName = 'bg-primary';
      break;
    case 'secondary':
      bgClassName = 'bg-secondary';
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer py-3 px-6 rounded-lg capitalize mt-auto ${bgClassName} ${className}`}
    >
      {children}
      {icon}
    </button>
  );
};

export default Button;
