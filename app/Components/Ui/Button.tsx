'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, onClick, className = '', variant = 'primary' }: ButtonProps) => {
  const styles = {
    primary: "relative px-12 py-3 rounded-tl-full rounded-bl-full rounded-br-full rounded-tr-[10px] border-2 border-white text-white transition-colors duration-600 btn-hover-effect before:bg-white hover:text-black uppercase tracking-wider text-sm cursor-pointer",
    secondary: "relative px-12 py-3 rounded-tl-full rounded-bl-full rounded-br-full rounded-tr-[10px] border-2 border-black text-black transition-colors duration-600 btn-hover-effect before:bg-black hover:text-white uppercase tracking-wider text-sm cursor-pointer"
  };

  return (
    <button onClick={onClick} className={`${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;