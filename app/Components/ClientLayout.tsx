'use client';
import { useState, useEffect } from 'react';
import Navbar from "./Navbar/Navbar";
import { useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const router = useRouter();

  // Função para verificar o status de verificação de idade
  const checkAgeVerification = () => {
    if (typeof window !== 'undefined') {
      const ageVerified = localStorage.getItem('ageVerified') === 'true';
      setIsAgeVerified(ageVerified);

      // Se não for verificado, redireciona para a tela de idade
      if (!ageVerified && window.location.pathname !== '/') {
        router.push('/'); // redireciona para uma página de verificação de idade
      }
    }
  };

  // Função para verificar se estamos na página de login
  const checkLoginPage = () => {
    if (typeof window !== 'undefined') {
      setIsLoginPage(window.location.pathname === '/Login');
    }
  };

  useEffect(() => {
    setIsClient(true);
    checkAgeVerification();
    checkLoginPage();

    const handleAgeVerified = () => {
      setIsAgeVerified(true);
    };

    window.addEventListener('ageVerified', handleAgeVerified);

    const handleRouteChange = () => {
      checkLoginPage();
    };

    window.addEventListener('popstate', handleRouteChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(this, arguments as any);
      setTimeout(checkLoginPage, 0);
    };

    return () => {
      window.removeEventListener('ageVerified', handleAgeVerified);
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    checkLoginPage();
    const intervalId = setInterval(checkLoginPage, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Se for a página de login, renderiza apenas o conteúdo
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      {isClient && isAgeVerified && <Navbar />}
      {children}
    </>
  );
}
