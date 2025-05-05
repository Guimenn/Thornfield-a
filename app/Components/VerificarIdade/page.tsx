'use client';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './Entrada.css';

export default function AgeGate() {
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [animationComplete, setAnimationComplete] = useState(false);
    
    // Refs para os inputs
    const diaRef = useRef<HTMLInputElement>(null);
    const mesRef = useRef<HTMLInputElement>(null);
    const anoRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const MensagemErro = (mensagem: string) => {
        const elemento = document.getElementById('MensagemErro');
        if (elemento) {
            elemento.innerHTML = mensagem;
        }
    }

    const MensagemErroIdade = (mensagem: string) => {
        const elemento = document.getElementById('MensagemErroIdade');
        if (elemento) {
            elemento.innerHTML = mensagem;
        }
    }

    // Este efeito dispara o evento quando a animação termina
    useEffect(() => {
        if (animationComplete) {
            localStorage.setItem('ageVerified', 'true'); 
            
            // Dispara um evento personalizado para notificar outros componentes
            const ageVerifiedEvent = new CustomEvent('ageVerified', { detail: true });
            window.dispatchEvent(ageVerifiedEvent);
        }
    }, [animationComplete]);

    // Efeito para ouvir a tecla ENTER
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                // Evita comportamento padrão (como envio de formulário)
                event.preventDefault();
                
                // Simula o clique no botão
                buttonRef.current?.click();
            }
        };

        // Adiciona o ouvinte de evento
        window.addEventListener('keydown', handleKeyDown);

        // Remove o ouvinte de evento quando o componente é desmontado
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Função para lidar com o preenchimento do dia
    const handleDiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Aceita apenas números
        if (value.length <= 2) {
            setDia(value);
            // Move para o próximo campo quando tiver 2 dígitos
            if (value.length === 2) {
                if (parseInt(value) > 0 && parseInt(value) <= 31) {
                    mesRef.current?.focus();
                }
            }
        }
    };

    // Função para lidar com o preenchimento do mês
    const handleMesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Aceita apenas números
        if (value.length <= 2) {
            setMes(value);
            // Move para o próximo campo quando tiver 2 dígitos
            if (value.length === 2) {
                if (parseInt(value) > 0 && parseInt(value) <= 12) {
                    anoRef.current?.focus();
                }
            }
        }
    };

    // Função para lidar com o preenchimento do ano
    const handleAnoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Aceita apenas números
        if (value.length <= 4) {
            setAno(value);
            // Se o campo estiver completamente preenchido, podemos verificar
            if (value.length === 4) {
                const anoAtual = new Date().getFullYear();
                if (parseInt(value) >= 1900 && parseInt(value) <= anoAtual) {
                    // Podemos focar no botão após preencher todos os campos
                    buttonRef.current?.focus();
                }
            }
        }
    };

    const VerificarIdade = () => {
        if (!dia || !mes || !ano) {
            MensagemErro('Por favor preencha todos os campos.');
            return;
        }

        const [diaNum, mesNum, anoNum] = [parseInt(dia), parseInt(mes), parseInt(ano)];
        const anoAtual = new Date().getFullYear();

        if (diaNum < 1 || diaNum > 31 || mesNum < 1 || mesNum > 12 || anoNum < 1900 || anoNum > anoAtual) {
            MensagemErro('Por favor verifique os campos e tente novamente.');
            return;
        }

        const dataNascimento = new Date(anoNum, mesNum - 1, diaNum);
        const dataAtual = new Date();

        const diffAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
        const idade = dataAtual.getMonth() < dataNascimento.getMonth() ||
            (dataAtual.getMonth() === dataNascimento.getMonth() && dataAtual.getDate() < dataNascimento.getDate())
            ? diffAnos - 1
            : diffAnos;

        if (idade <= 17) {
            MensagemErroIdade('VOCÊ É MUITO JOVEM PARA ENTRAR NESTE SITE!');

            ['text-welcome', 'text-terms', 'text-awards', 'input-date', 'MensagemErro'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = '';
                    element.style.display = 'none';
                }
            });

            const botao = document.getElementById('ButtonSite');
            if (botao) {
                botao.innerHTML = 'VOLTAR';
                botao.onclick = () => window.location.reload();
            }
            return;
        }

        // Primeiro, adiciona fade-out em todos os textos
        ['text-welcome', 'text-terms', 'text-awards', 'input-date', 'MensagemErro', 'ButtonSite'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('fade-out');
            }
        });

        // Adiciona a animação de respiração na imagem
        const backgroundAnimation = document.querySelector('.background-animation');
        if (backgroundAnimation) {
            backgroundAnimation.classList.add('breathing');

            // Após 2 segundos (duas respirações completas), adiciona o efeito de entrar na imagem
            setTimeout(() => {
                backgroundAnimation.classList.remove('breathing');
                backgroundAnimation.classList.add('enter-image');
            }, 2000);
        }

        // Após 2.8 segundos (tempo total das animações), mostra a página principal
        setTimeout(() => {
            const container = document.querySelector('.age-gate-container');
            if (container) {
                container.classList.add('fade-out');
                // Espera o fade-out terminar antes de mostrar a página principal
                setTimeout(() => {
                    setAnimationComplete(true);
                }, 500);
            }
        }, 2800);
    }

    // Usamos useEffect para focar no primeiro campo quando a página carrega
    useEffect(() => {
        diaRef.current?.focus();
    }, []);

    return (
        <div className="age-gate-container">
            <div className="age-gate-content relative h-screen w-screen flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-13">
                <div id="MensagemErroIdade" className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-center px-4'></div>
                <div className="background-animation"></div>
                <div className='flex flex-col items-center justify-center gap-1 px-4 text-center' id='text-welcome'>
                    <h1 className='text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light'>THORNFIELD</h1>
                    <h3 className='text-white text-[10px] sm:text-xs font-light mt-1 md:mt-2'>O WHISKY SINGLE MALT MAIS PREMIADO DO MUNDO NOS ÚLTIMOS ANOS*</h3>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 mt-4 md:mt-6' id='input-date'>
                    <label htmlFor="date" className='text-white text-[10px] sm:text-xs font-light'>INSIRA SUA DATA DE NASCIMENTO</label>
                    <div className='flex flex-row items-center justify-center gap-2 mt-1'>
                        <input 
                            type="text" 
                            ref={diaRef}
                            className='w-5 sm:w-6 md:w-7 border-b-2 border-white bg-transparent text-white focus:outline-none text-center' 
                            placeholder='DD' 
                            value={dia}
                            onChange={handleDiaChange} 
                            maxLength={2} 
                        />/
                        <input 
                            type="text" 
                            ref={mesRef}
                            className='w-5 sm:w-6 md:w-7 border-b-2 border-white bg-transparent text-white focus:outline-none text-center' 
                            placeholder='MM' 
                            value={mes}
                            onChange={handleMesChange} 
                            maxLength={2} 
                        />/
                        <input 
                            type="text" 
                            ref={anoRef}
                            className='w-8 sm:w-10 md:w-12 border-b-2 border-white bg-transparent text-white focus:outline-none text-center' 
                            placeholder='YYYY' 
                            value={ano}
                            onChange={handleAnoChange} 
                            maxLength={4} 
                        />
                    </div>
                    <div id="MensagemErro" className='font-light text-xs sm:text-sm mt-1 text-center'></div>
                </div>
                <button 
                    id='ButtonSite' 
                    ref={buttonRef}
                    className='bg-transparent text-white underline text-xl sm:text-2xl rounded-md p-2 underline-offset-4 my-4 sm:my-6 hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/30' 
                    onClick={VerificarIdade}
                >
                    ENTRAR
                </button>
               
                <p className='text-white text-xs sm:text-sm md:text-base font-light text-wrap w-[90%] sm:w-[85%] md:w-[80%] mb-8 text-center px-4' id='text-awards'>
                    *A linha Thornfield recebeu mais prêmios desde 2018 do que qualquer outro whisky single malt em duas das competições mais prestigiadas do mundo, a International Wine & Spirit Competition e o International Spirits Challenge.
                </p>
            </div>
        </div>
    )
} 