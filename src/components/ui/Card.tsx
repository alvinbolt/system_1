import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type CardProps = {
  children: ReactNode;
  className?: string;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
};

const Card = ({
  children,
  className = '',
  elevation = 'md',
  interactive = false,
  onClick,
}: CardProps) => {
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const baseClasses = 'bg-white rounded-xl overflow-hidden';
  const interactiveClasses = interactive ? 'cursor-pointer transition-transform duration-300' : '';

  return interactive ? (
    <motion.div
      className={clsx(baseClasses, elevationClasses[elevation], interactiveClasses, className)}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={clsx(baseClasses, elevationClasses[elevation], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;