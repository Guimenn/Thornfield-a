declare module 'framer-motion' {
  import { ReactNode, ReactElement, HTMLAttributes, ButtonHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    className?: string;
    children?: ReactNode;
  }
  
  export const motion: {
    div: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
    p: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;
    h2: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>;
    button: ForwardRefExoticComponent<MotionProps & ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>;
  };
  
  export const AnimatePresence: React.FC<{
    children?: ReactNode;
  }>;
} 