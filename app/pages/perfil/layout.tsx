'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0501]">
            {/* Padrão de fundo sutil */}
            <div
                className="fixed inset-0 opacity-10 z-0"
                style={{ backgroundImage: 'url("/pattern-dark.svg")', backgroundSize: '200px' }}
            ></div>

            {/* Conteúdo principal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                {children}
            </motion.div>
        </div>
    );
}