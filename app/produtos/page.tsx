"use client";
import './produtos.css';

export default function Produtos() {
	const produtos = [
		{
			id: 1,
			nome: "TENNESSEE HONEY",
			imagem: "/icons-produtos/abelha.svg",
			descricao: "Jack Daniel's Tennessee Honey",
			bg: "/"
		},
		{
			id: 2,
			nome: "TENNESSEE FIRE",
			imagem: "/icons-produtos/fogo.svg",
			descricao: "Jack Daniel's Tennessee Fire"
		},
		{
			id: 3,
			nome: "TENNESSEE APPLE",
			imagem: "/icons-produtos/apple.svg",
			descricao: "Jack Daniel's Tennessee Apple"
		},
		{
			id: 4,
			nome: "GENTLEMAN JACK",
			imagem: "/icons-produtos/sinatra.svg",
			descricao: "Gentleman Jack"
		},
		{
			id: 5,
			nome: "SINGLE BARREL",
			imagem: "/icons-produtos/barril.svg",
			descricao: "Single Barrel"
		},
		{
			id: 6,
			nome: "SINATRA SELECT",
			imagem: "/icons-produtos/sinatra.svg",
			descricao: "Sinatra Select"
		},
		{
			id: 7,
			nome: "JACK & COKE",
			imagem: "/icons-produtos/lata.svg",
			descricao: "Jack & Coke"
		},
		{
			id: 8,
			nome: "HONEY & LEMONADE",
			imagem: "/icons-produtos/lata.svg",
			descricao: "Honey & Lemonade"
		},
		{
			id: 1,
			nome: "THORNFIELD 12 ANOS",
			imagem: "/bottle1.jpg",
			descricao: "Descrição detalhada do 12 anos..."
		},
		{
			id: 2,
			nome: "THORNFIELD 18 ANOS",
			imagem: "/bottle2.jpg",
			descricao: "Descrição detalhada do 18 anos..."
		},
		{
			id: 3,
			nome: "THORNFIELD RESERVE",
			imagem: "/bottle3.jpg",
			descricao: "Descrição detalhada do Reserve..."
		}
	];

	return (
		<main className="bg-black text-white min-h-screen pt-[100px]">
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-5xl font-light text-center mb-16 uppercase tracking-widest">Nossa Coleção</h1>

				<div className="sticky top-[100px] z-40 bg-black/90 backdrop-blur-md py-4 mb-12 w-full border-y border-white/10">
					<div className="flex justify-center space-x-4 md:space-x-8">
						{produtos.map((produto) => (
							<a 
								href={`#produto-${produto.id}`} 
								key={produto.id} 
								className="flex flex-col items-center w-24 md:w-28 group transition-opacity duration-300 hover:opacity-100 opacity-70"
								onClick={(e) => {
									e.preventDefault();
									document.getElementById(`produto-${produto.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
								}}
							>
								<div className="w-16 h-16 flex items-center justify-center mb-1">
									<img
										src={produto.imagem}
										alt={produto.descricao}
										className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
									/>
								</div>
								<h2 className="text-white text-center text-xs md:text-sm font-light tracking-wider leading-tight">
									{produto.nome}
								</h2>
							</a>
						))}
					</div>
				</div>

				<div className="space-y-24">
					{produtos.map((produto) => (
						<section key={produto.id} id={`produto-${produto.id}`} className="grid md:grid-cols-2 gap-12 items-center scroll-mt-[160px]">
							<div className="flex justify-center">
								<img src={produto.imagem} alt={produto.nome} className="max-h-[500px] object-contain" />
							</div>
							<div>
								<h2 className="text-4xl font-light mb-4 uppercase tracking-widest">{produto.nome}</h2>
								<p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
									{produto.descricao}
								</p>
								<button className="px-6 py-2 border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black transition duration-300">
									COMPRAR AGORA
								</button>
							</div>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}
