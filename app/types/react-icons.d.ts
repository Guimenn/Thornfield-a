declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  
  export const FaGoogle: IconType;
  export const FaFingerprint: IconType;
  export const FaWineGlassAlt: IconType;
  export const FaUserPlus: IconType;
  export const FaSignInAlt: IconType;
  export const FaExclamationCircle: IconType;
  export const FaEye: IconType;
  export const FaEyeSlash: IconType;
}

declare module 'react-icons' {
  import { ComponentType, SVGAttributes } from 'react';
  
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = ComponentType<IconBaseProps>;
} 