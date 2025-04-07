'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}) => {
  const baseStyles = "px-12 py-3 rounded-tl-full rounded-bl-full rounded-br-full rounded-tr-[10px] border-2 transition duration-300 uppercase tracking-wider text-sm";
  
  const variantStyles = {
    primary: "border-white text-white hover:bg-white hover:text-black",
    secondary: "border-black text-black hover:bg-black hover:text-white"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 