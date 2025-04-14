'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Mail, Calendar, MapPin, Edit, Camera, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signOut, updateProfile } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { promises as fs } from 'fs';
import path from 'path';

interface UserData {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
    location?: string;
}

// Inicializa o Firebase Storage
const firebaseConfig = {
    apiKey: "AIzaSyAwngi3IyB9jiTWroD8D_Yp9VOcCimqlwA",
    authDomain: "thornfield-64f32.firebaseapp.com",
    projectId: "thornfield-64f32",
    storageBucket: "thornfield-64f32.appspot.com",
    messagingSenderId: "82291685668",
    appId: "1:82291685668:web:b251987856900c4b339bb1",
    measurementId: "G-BGFYBGSZ3E"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function PerfilPage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageKey, setImageKey] = useState(Date.now()); // Add state for image key
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setEditName(userData.name || '');
            setEditLocation(userData.location || 'Brasil');
        } else {
            router.push('/Login');
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleProfilePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
    
        try {
            setIsUploading(true);
            setUploadProgress(10);
            
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('A imagem deve ter no máximo 5MB');
            }
    
            if (!file.type.startsWith('image/')) {
                throw new Error('O arquivo deve ser uma imagem');
            }
    
            setUploadProgress(30);
            
            const userId = user.id || 'user_' + Date.now();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
    
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Falha no upload. Status: ' + response.status);
            }
    
            const { photoURL } = await response.json();
            setUploadProgress(90);
            
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL });
            }
    
            const updatedUser = { 
                ...user, 
                photoURL 
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setImageKey(Date.now());
            setUploadProgress(100);
    
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            alert(error instanceof Error ? error.message : 'Erro desconhecido ao atualizar foto de perfil');
        } finally {
            setTimeout(() => {
                setIsUploading(false);
                setUploadProgress(0);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }, 500);
        }
    };

    const handleSaveProfile = async () => {
        if (!user) return;

        try {
            if (auth.currentUser && editName) {
                await updateProfile(auth.currentUser, { displayName: editName });
            }

            const updatedUser = {
                ...user,
                name: editName || user.name,
                location: editLocation || 'Brasil'
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            closeEditModal();

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-b from-[#0A0501] to-[#1a0f02]">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-amber-600 border-t-transparent shadow-lg"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A0501] to-[#1a0f02] pt-32 pb-20">
            <div
                className="absolute inset-0 opacity-15 z-0 bg-repeat"
                style={{
                    backgroundImage: 'url("/pattern.png")',
                    backgroundSize: '200px',
                    filter: 'blur(0.5px)'
                }}
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h3 className="mb-4 text-lg uppercase tracking-[0.2em] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent font-medium">
                        Meu Perfil
                    </h3>
                    <h2 className="font-serif text-5xl font-light text-amber-50 md:text-6xl mb-6">
                        Informações Pessoais
                    </h2>
                    <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent mx-auto"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="bg-black/50 backdrop-blur-md rounded-3xl overflow-hidden border border-amber-600/20 shadow-[0_20px_50px_-12px_rgba(255,191,0,0.2)]"
                    >
                        <div className="p-10 md:p-14">
                            <div className="flex flex-col md:flex-row items-center mb-14">
                                <div
                                    className="relative w-36 h-36 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-1 flex items-center justify-center mb-6 md:mb-0 md:mr-10 shadow-xl hover:scale-105 transition-transform duration-300 group cursor-pointer"
                                    onClick={handleProfilePhotoClick}
                                >
                                    {isUploading ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full">
                                            <Loader2 size={40} className="text-amber-500 animate-spin mb-2" />
                                            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500 transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-amber-500 mt-1">{uploadProgress}%</span>
                                        </div>
                                    ) : (
                                        <>
                                            {user.photoURL ? (
                                                <img
                                                    key={imageKey} // Add key prop to force re-render
                                                    src={`${user.photoURL}?${imageKey}`} // Add timestamp to URL
                                                    alt={user.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User size={52} className="text-white" />
                                            )}
                                            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <Camera size={32} className="text-white" />
                                            </div>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center">
                                        <h3 className="text-4xl font-serif font-light text-white mb-3">
                                            {user.name}
                                        </h3>
                                        <button
                                            onClick={openEditModal}
                                            className="ml-4 p-2 rounded-full bg-amber-900/30 hover:bg-amber-900/50 transition-colors duration-300"
                                        >
                                            <Edit size={18} className="text-amber-400" />
                                        </button>
                                    </div>
                                    <p className="text-amber-400/90 text-lg font-medium">
                                        Membro Thornfield
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-12 h-12 rounded-full bg-amber-900/40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                            <Mail size={20} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-amber-200/60 text-sm font-medium mb-1">Email</p>
                                            <p className="text-white text-lg">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-12 h-12 rounded-full bg-amber-900/40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                            <Calendar size={20} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-amber-200/60 text-sm font-medium mb-1">Membro desde</p>
                                            <p className="text-white text-lg">{new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-12 h-12 rounded-full bg-amber-900/40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                            <MapPin size={20} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-amber-200/60 text-sm font-medium mb-1">Localização</p>
                                            <p className="text-white text-lg">{user.location || 'Brasil'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-5 group">
                                        <div className="w-12 h-12 rounded-full bg-amber-900/40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                            <User size={20} className="text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-amber-200/60 text-sm font-medium mb-1">Tipo de conta</p>
                                            <p className="text-white text-lg">Padrão</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 pt-8 border-t border-amber-600/20">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 px-8 py-4 rounded-full bg-red-900/20 text-red-400 hover:bg-red-900/30 hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/10"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Sair da conta</span>
                                </button>

                                <Link
                                    href="/"
                                    className="flex items-center space-x-3 px-8 py-4 rounded-full bg-amber-900/20 text-amber-400 hover:bg-amber-900/30 hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-900/10"
                                >
                                    <span className="font-medium">Voltar para a loja</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Modal de Edição de Perfil */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#0A0501] border border-amber-600/30 rounded-2xl p-8 max-w-md w-full shadow-[0_20px_60px_-15px_rgba(255,191,0,0.3)]"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif text-amber-50">Editar Perfil</h3>
                            <button
                                onClick={closeEditModal}
                                className="p-2 rounded-full hover:bg-amber-900/30 transition-colors duration-300"
                            >
                                <X size={20} className="text-amber-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-amber-200/80 text-sm font-medium mb-2">Nome</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full bg-amber-900/10 border border-amber-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-amber-200/80 text-sm font-medium mb-2">Localização</label>
                                <input
                                    type="text"
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    className="w-full bg-amber-900/10 border border-amber-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handleSaveProfile}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-900/20"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}