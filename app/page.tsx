"use client";
import { useState, useEffect } from "react";
import AgeGate from "./Components/VerificarIdade/page";
import Loading from "./Components/Ui/Loading/Loading";
import HeroSection from "./Components/Sections/HeroSection";
import VideoSection from "./Components/Sections/VideoSection";
import Heritage from "./Components/Sections/Heritage";
import Footer from "./Components/Footer/Footer";
import BarrelAging from "./Components/Sections/BarrelAging";
import Newsletter from "./Components/Sections/Newsletter";

// Novas seções sofisticadas
import MasterCraftsmanship from "./Components/Sections/MasterCraftsmanship";
import ExclusiveEditions from "./Components/Sections/ExclusiveEditions";
import AwardsShowcase from "./Components/Sections/AwardsShowcase";
import TastingJourney from "./Components/Sections/TastingJourney";
import MaisVendidos from "./Components/Sections/MaisVendidos";
export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ageVerifiedStorage = localStorage.getItem("ageVerified") === "true";
      setIsAgeVerified(ageVerifiedStorage);
      setLoading(false);
    }, 1000);

    const handleAgeVerified = () => {
      setFadeOut(true);
      setTimeout(() => {
        setIsAgeVerified(true);
        setAnimationComplete(true);
      }, 500);
    };

    window.addEventListener("ageVerified", handleAgeVerified);

    return () => {
      window.removeEventListener("ageVerified", handleAgeVerified);
      clearTimeout(timer);
    };
  }, []);

  // useEffect separado para salvar no localStorage
  useEffect(() => {
    if (animationComplete) {
      localStorage.setItem("ageVerified", "true");
    }
  }, [animationComplete]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {!isAgeVerified && <AgeGate />}
      {isAgeVerified && (
        <main className="min-h-screen bg-[#0A0501] text-white overflow-hidden">
          {/* Hero Section - Apresentação impactante da marca */}
          <HeroSection />
          
          {/* Heritage - História e legado da marca */}
          <Heritage />

          {/* Master Craftsmanship - O processo artesanal de produção */}
          <MasterCraftsmanship />

          {/* Barrel Aging - O processo de envelhecimento em barris */}
          <BarrelAging />
          
          {/* Mais Vendidos - Produtos mais vendidos */}
          <MaisVendidos />

          {/* Video Section - Vídeo cinematográfico da destilaria */}
          <VideoSection />
          
          {/* Awards Showcase - Prêmios e reconhecimentos */}
          <AwardsShowcase />
          
          {/* Newsletter - Inscrição para newsletter */}
          <Newsletter />
          
          {/* Footer - Rodapé com informações e links */}
          <Footer />
        </main>
      )}
    </div>
  );
}
