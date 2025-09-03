declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    className?: string;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
  }

  export const motion: {
    div: React.FC<MotionProps>;
    button: React.FC<MotionProps>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'sync' | 'wait';
  }>;
} 