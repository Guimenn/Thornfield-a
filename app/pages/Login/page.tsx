  'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFingerprint, FaWineGlassAlt, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopupHelp, setShowPopupHelp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetingPassword, setIsResetingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const router = useRouter();

  // Verificar se há uma URL de retorno
  useEffect(() => {
    // Verifica se o usuário veio do carrinho
    const returnUrl = localStorage.getItem('returnUrl');
    if (!returnUrl) {
      // Se não houver URL de retorno, salva a página atual
      localStorage.setItem('returnUrl', window.location.href);
    }
  }, []);

  // Verificar se já está logado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const returnUrl = localStorage.getItem('returnUrl') || '/';
      localStorage.removeItem('returnUrl');
      router.push(returnUrl);
    }
  }, [router]);

  const redirectAfterLogin = () => {
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl && returnUrl.includes('/pages/checkout')) {
      // Se veio do carrinho, volta para lá
      localStorage.removeItem('returnUrl'); // Limpa a URL de retorno
      router.push('/pages/produtos');
    } else {
      // Caso contrário, vai para a página inicial
      router.push('/');
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setShowError(false);
      setShowPopupHelp(false);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Salva os dados do usuário no JSON
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google'
      };
      
      await saveUserData(userData);
      
      // Salva os dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.uid,
        name: user.displayName || 'Usuário',
        email: user.email
      }));

      // Define o localStorage como ageVerified como true
      localStorage.setItem('ageVerified', 'true');
      
      // Dispara o evento personalizado
      const ageVerifiedEvent = new CustomEvent('ageVerified', { detail: true });
      window.dispatchEvent(ageVerifiedEvent);

      redirectAfterLogin();
    } catch (error: any) {
      console.error('Erro ao fazer login com Google:', error);
      
      // Tratamento específico para o erro de popup fechado pelo usuário
      if (error.code === 'auth/popup-closed-by-user') {
        setError('O processo de login foi cancelado. Por favor, tente novamente.');
        setShowPopupHelp(true);
      } else if (error.code === 'auth/popup-blocked') {
        setError('O popup de login foi bloqueado pelo navegador. Por favor, permita popups para este site.');
        setShowPopupHelp(true);
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('O processo de login foi cancelado. Por favor, tente novamente.');
        setShowPopupHelp(true);
      } else {
        setError('Erro ao fazer login com Google. Por favor, tente novamente.');
      }
      
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    
    if (!email) {
      setError('Por favor, insira seu email para redefinir a senha.');
      setShowError(true);
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);
      
      // Verifica se o email existe no JSON
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      
      const data = await response.json();
      const user = data.users.find((u: any) => u.email === email);
      
      if (!user) {
        setError('Nenhum usuário encontrado com este email.');
        setShowError(true);
        return;
      }

      // Se o email existir, muda para o formulário de redefinição de senha
      setIsForgotPassword(false);
      setIsResetingPassword(true);
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      setError('Erro ao verificar email. Tente novamente mais tarde.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);
    
    if (!newPassword || !confirmNewPassword) {
      setError('Por favor, preencha todos os campos.');
      setShowError(true);
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setShowError(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('As senhas não coincidem.');
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);
      
      // Verifica se o email existe e obtém a senha atual
      const responseGet = await fetch('/api/users');
      if (!responseGet.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      
      const data = await responseGet.json();
      const user = data.users.find((u: any) => u.email === email);
      
      if (!user) {
        setError('Nenhum usuário encontrado com este email.');
        setShowError(true);
        return;
      }
      
      // Verifica se a nova senha é diferente da antiga
      if (user.password === newPassword) {
        setError('A nova senha não pode ser igual à senha atual.');
        setShowError(true);
        return;
      }

      // Atualiza a senha no JSON
      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar senha no sistema');
      }

      setSuccessMessage('Senha atualizada com sucesso!');
      setShowSuccess(true);
      
      // Retorna para a tela de login após 2 segundos
      setTimeout(() => {
        setIsResetingPassword(false);
        setSuccessMessage('');
        setShowSuccess(false);
      }, 2000);
    } catch (error: any) {
      setError('Erro ao atualizar senha. Tente novamente mais tarde.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
  
    try {
      setIsLoading(true);
  
      if (isCreatingAccount) {
        try {
          // Criar conta diretamente com o Firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
  
          // Salva os dados do usuário no JSON
          const userData = {
            uid: user.uid,
            email: user.email,
            password: password, // Em um sistema real, NUNCA armazene senhas em texto puro
            provider: 'email'
          };
          
          await saveUserData(userData);
          
          // Salva os dados do usuário no localStorage
          localStorage.setItem('user', JSON.stringify({
            id: user.uid,
            name: email.split('@')[0], // Usa a parte antes do @ como nome
            email: user.email
          }));

          // Define o localStorage como ageVerified como true
          localStorage.setItem('ageVerified', 'true');
  
          // Dispara o evento personalizado
          const ageVerifiedEvent = new CustomEvent('ageVerified', { detail: true });
          window.dispatchEvent(ageVerifiedEvent);
  
          redirectAfterLogin();
        } catch (error: any) {
          if (error.code === 'auth/operation-not-allowed') {
            setError('Autenticação por email/senha não está habilitada. Por favor, contate o administrador.');
          } else if (error.code === 'auth/email-already-in-use') {
            setError('Este email já está em uso. Por favor, use outro email ou faça login.');
          } else {
            setError('Erro ao criar conta. Por favor, tente novamente.');
          }
          setShowError(true);
          console.error('Erro ao criar conta:', error);
        }
      } else {
        try {
          // Primeiro, verificar se o usuário existe no JSON
          const responseGet = await fetch('/api/users');
          if (!responseGet.ok) {
            throw new Error('Erro ao buscar dados do usuário');
          }
          
          const data = await responseGet.json();
          const localUser = data.users.find((u: any) => u.email === email);
          
          if (!localUser) {
            setError('Email não encontrado em nosso sistema.');
            setShowError(true);
            return;
          }
          
          // Verificar se a senha está correta no JSON local
          if (localUser.password !== password) {
            setError('Senha incorreta.');
            setShowError(true);
            return;
          }
          
          try {
            // Tenta fazer login com Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Se o login Firebase for bem-sucedido, usa os dados do Firebase
            localStorage.setItem('user', JSON.stringify({
              id: user.uid,
              name: email.split('@')[0],
              email: user.email
            }));
          } catch (firebaseError) {
            console.log('Erro na autenticação Firebase:', firebaseError);
            console.log('Usando autenticação local...');
            
            // Se falhar no Firebase, usa os dados do JSON local
            localStorage.setItem('user', JSON.stringify({
              id: localUser.uid || 'local-' + Date.now(),
              name: email.split('@')[0],
              email: email
            }));
          }

          // Define o localStorage como ageVerified como true
          localStorage.setItem('ageVerified', 'true');

          // Dispara o evento personalizado
          const ageVerifiedEvent = new CustomEvent('ageVerified', { detail: true });
          window.dispatchEvent(ageVerifiedEvent);

          redirectAfterLogin();
        } catch (loginError: any) {
          console.error('Erro ao fazer login:', loginError);
          setError('Erro ao fazer login. Verifique suas credenciais.');
          setShowError(true);
          return;
        }
      }
    } catch (error: any) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      setShowError(true);
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const saveUserData = async (userData: any) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar dados do usuário');
      }
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };

  const getUserData = async (email: string) => {
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Botão de voltar melhorado */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-black/30 hover:bg-black/50 text-amber-400 hover:text-amber-300 px-4 py-2 rounded-full transition-all duration-300 border border-amber-500/30 hover:border-amber-500/50 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span className="font-light tracking-wide">Voltar</span>
      </Link>

      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Lado esquerdo - Formulário */}
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md relative z-10 flex flex-col justify-center">
        {/* Logo com animação */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full filter blur-xl animate-pulse"></div>
            <Image
              src="/cabra.png"
              alt="Whisky Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              priority
            />
          </div>
        </motion.div>

      
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-300 text-center mb-8 text-base md:text-lg font-light tracking-wide"
        >
          Entre para acessar nossa seleção exclusiva de whiskies premium
        </motion.p>

        {/* Mensagem de erro geral */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 max-w-md mx-auto w-full"
              role="alert"
            >
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Erro!</span> {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensagem de sucesso */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 max-w-md mx-auto w-full"
              role="alert"
            >
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Sucesso!</span> {successMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensagem de ajuda para popup fechado */}
        <AnimatePresence>
          {showPopupHelp && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-4 mb-4 text-sm text-amber-800 border border-amber-300 rounded-lg bg-amber-50 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-800 max-w-md mx-auto w-full"
              role="alert"
            >
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Dica</span>
              <div>
                <span className="font-medium">Dica:</span> Se você está tendo problemas com o popup, use o botão "Continuar com Google" abaixo.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Abas de Login/Criar Conta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mb-8 max-w-md mx-auto w-full"
        >
          <div className="flex bg-black/40 rounded-lg p-1 w-full relative">
            {/* Background animado */}
            <motion.div
              className="absolute top-1 left-1 h-[calc(100%-8px)] rounded-md bg-amber-600"
              initial={false}
              animate={{
                width: isCreatingAccount ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                x: isCreatingAccount ? 'calc(100% + 4px)' : '0%',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button
              onClick={() => setIsCreatingAccount(false)}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-all duration-300 relative z-10 ${
                !isCreatingAccount
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaSignInAlt size={16} />
              <span className="font-medium">Entrar</span>
            </button>
            <button
              onClick={() => setIsCreatingAccount(true)}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-all duration-300 relative z-10 ${
                isCreatingAccount
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaUserPlus size={16} />
              <span className="font-medium">Criar Conta</span>
            </button>
          </div>
        </motion.div>

        {/* Formulário de email/senha */}
        <form 
          onSubmit={
            isCreatingAccount 
              ? handleEmailPasswordSignIn 
              : (isForgotPassword 
                  ? handleForgotPassword 
                  : (isResetingPassword 
                      ? handleResetPassword 
                      : handleEmailPasswordSignIn))
          } 
          className="space-y-4 max-w-md mx-auto w-full"
        >
          {/* Campo de email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500/70 group-hover:text-gold-500 transition-colors duration-300">
              <FaWineGlassAlt size={20} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-black/40 border ${
                errors.email ? 'border-red-500' : 'border-gold-500/30'
              } rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300 group-hover:bg-black/50`}
              placeholder="Email"
              disabled={isResetingPassword}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Formulário de login regular (não esqueceu senha, não está redefinindo) */}
          {!isForgotPassword && !isResetingPassword && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500/70 group-hover:text-gold-500 transition-colors duration-300">
                  <FaFingerprint size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-black/40 border ${
                    errors.password ? 'border-red-500' : 'border-gold-500/30'
                  } rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300 group-hover:bg-black/50`}
                  placeholder="Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
                )}
              </motion.div>

              {/* Campo de confirmação de senha (apenas para criar conta) */}
              <AnimatePresence>
                {isCreatingAccount && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative group overflow-hidden"
                  >
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500/70 group-hover:text-gold-500 transition-colors duration-300">
                      <FaFingerprint size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-black/40 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gold-500/30'
                      } rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300 group-hover:bg-black/50`}
                      placeholder="Confirmar Senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Link para esqueceu a senha (apenas na tela de login, não de criar conta) */}
              {!isCreatingAccount && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-amber-400 hover:text-amber-300 text-sm transition-colors duration-300"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}
            </>
          )}

          {/* Formulário de redefinição de senha */}
          {isResetingPassword && (
            <>
              <div className="text-center mb-4">
                <p className="text-amber-400">Redefinindo senha para: {email}</p>
                <p className="text-gray-400 text-sm mt-1">A senha deve ter pelo menos 6 caracteres.</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500/70 group-hover:text-gold-500 transition-colors duration-300">
                  <FaFingerprint size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full bg-black/40 border border-gold-500/30 rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300 group-hover:bg-black/50`}
                  placeholder="Nova Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500/70 group-hover:text-gold-500 transition-colors duration-300">
                  <FaFingerprint size={20} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={`w-full bg-black/40 border border-gold-500/30 rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300 group-hover:bg-black/50`}
                  placeholder="Confirmar Nova Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </motion.div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-900/20 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : isForgotPassword 
                ? 'Verificar Email' 
                : (isResetingPassword 
                    ? 'Atualizar Senha' 
                    : (isCreatingAccount 
                        ? 'Criar Conta' 
                        : 'Entrar'))}
          </button>

          {(isForgotPassword || isResetingPassword) && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsResetingPassword(false);
                }}
                className="text-amber-400 hover:text-amber-300 text-sm transition-colors duration-300"
              >
                Voltar para login
              </button>
            </div>
          )}
        </form>

        {/* Separador com texto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center justify-center my-6 max-w-md mx-auto w-full"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-full"></div>
          <span className="text-gray-400 text-sm mx-4 whitespace-nowrap">Ou continue com</span>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-full"></div>
        </motion.div>

        {/* Botão do Google melhorado */}
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:border-amber-500/50 rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-900/20 cursor-pointer"
        >
          <FaGoogle className="text-amber-400" size={20} />
          <span className="font-medium">Continuar com Google</span>
        </motion.button>
      </div>

      {/* Lado direito - Imagem (visível apenas em telas médias e grandes) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:block w-1/2 relative overflow-hidden"
      >
        {/* Imagem de fundo com efeito de parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/Login-foto/Background-login.png"
            alt="Whisky Background"
            fill
            className="object-cover transform hover:scale-100 transition-transform duration-20000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/80 to-black/95"></div>
        </div>
        
        {/* Overlay com texto */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#D4AF37] mb-6 tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          >
            Thornfield
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-8"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-3xl text-gray-300 max-w-xl leading-relaxed font-light tracking-wide"
          >
            Descubra o mundo dos whiskies premium e faça parte de nossa comunidade exclusiva
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
} 
