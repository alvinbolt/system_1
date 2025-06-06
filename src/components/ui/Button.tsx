import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'rounded-full font-medium transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-900 hover:bg-primary-800 text-white focus:ring-primary-900',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-600',
    outline: 'border border-primary-900 text-primary-900 hover:bg-primary-50 focus:ring-primary-900',
    ghost: 'text-primary-900 hover:bg-primary-50 focus:ring-primary-900',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        widthClasses,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;