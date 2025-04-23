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
    custom?: any;
  }
  
  export const motion: {
    div: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
    p: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;
    h2: ForwardRefExoticComponent<MotionProps & HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>;
    button: ForwardRefExoticComponent<MotionProps & ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>;
  };
  
  export interface AnimatePresenceProps {
    children?: ReactNode;
    initial?: boolean;
    mode?: "sync" | "wait" | "popLayout";
    custom?: any;
  }
  
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
} 