declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
  
  interface ImageProps extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    className?: string;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
} 